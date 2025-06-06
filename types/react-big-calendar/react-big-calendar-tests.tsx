import * as React from "react";
import {
    Calendar,
    CalendarProps,
    Culture,
    dateFnsLocalizer,
    DateHeaderProps,
    DateLocalizer,
    DateRange,
    Day,
    dayjsLocalizer,
    DayLayoutFunction,
    EventProps,
    EventWrapperProps,
    globalizeLocalizer,
    HeaderProps,
    luxonLocalizer,
    momentLocalizer,
    Navigate,
    NavigateAction,
    ResourceHeaderProps,
    ShowMoreProps,
    stringOrDate,
    TimeGrid,
    ToolbarProps,
    View,
    ViewProps,
    Views,
    Week,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

// Don't want to add this as a dependency, because it is only used for tests.
declare const globalize: any;
declare const moment: any;
declare const dateFnsConfig: any;
declare const luxonConfig: any;
declare const dayjs: any;

declare const allViews: View[];

// Testing examples from demos page
// http://intljusticemission.github.io/react-big-calendar/examples/index.html

class CalendarEvent {
    title: string;
    allDay: boolean;
    start: Date;
    endDate: Date;
    desc: string;
    resourceId?: string | undefined;
    tooltip?: string | undefined;

    constructor(_title: string, _start: Date, _endDate: Date, _allDay?: boolean, _desc?: string, _resourceId?: string) {
        this.title = _title;
        this.allDay = _allDay || false;
        this.start = _start;
        this.endDate = _endDate;
        this.desc = _desc || "";
        this.resourceId = _resourceId;
    }
}

class CalendarResource {
    title: string;
    id: string;

    constructor(id: string, title: string) {
        this.id = id;
        this.title = title;
    }
}

// Basic Example Test
{
    interface Props {
        localizer: DateLocalizer;
    }
    const Basic = ({ localizer }: Props) => (
        <Calendar
            events={getEvents()}
            views={allViews}
            step={60}
            showMultiDayTimes
            defaultDate={new Date(2015, 3, 1)}
            localizer={localizer}
        />
    );

    const localizer = momentLocalizer(moment);

    <Basic localizer={localizer} />;
}

// date-fns Example Test
{
    interface Props {
        localizer: DateLocalizer;
    }
    const Basic = ({ localizer }: Props) => (
        <Calendar
            events={getEvents()}
            views={allViews}
            step={60}
            showMultiDayTimes
            defaultDate={new Date(2015, 3, 1)}
            localizer={localizer}
        />
    );

    const localizer = dateFnsLocalizer(dateFnsConfig);

    <Basic localizer={localizer} />;
}

// handle-drag-start Example Test
{
    interface Props {
        localizer: DateLocalizer;
    }
    const HandleDragStart = ({ localizer }: Props) => (
        <Calendar
            events={getEvents()}
            views={allViews}
            step={60}
            showMultiDayTimes
            defaultDate={new Date(2015, 3, 1)}
            localizer={localizer}
            handleDragStart={console.log}
        />
    );

    const localizer = dateFnsLocalizer(dateFnsConfig);

    <HandleDragStart localizer={localizer} />;
}

// luxon Example Test
{
    interface Props {
        localizer: DateLocalizer;
    }
    const Basic = ({ localizer }: Props) => (
        <Calendar
            events={getEvents()}
            views={allViews}
            step={60}
            showMultiDayTimes
            defaultDate={new Date(2015, 3, 1)}
            localizer={localizer}
        />
    );

    const localizer = luxonLocalizer(luxonConfig, { firstDayOfWeek: 0 });

    <Basic localizer={localizer} />;
}

// dayjs Example Test
{
    interface Props {
        localizer: DateLocalizer;
    }
    const Basic = ({ localizer }: Props) => (
        <Calendar
            events={getEvents()}
            views={allViews}
            step={60}
            showMultiDayTimes
            defaultDate={new Date(2015, 3, 1)}
            localizer={localizer}
        />
    );

    const localizer = dayjsLocalizer(dayjs);

    <Basic localizer={localizer} />;
}

// Drag and Drop Example Test
{
    class MyCalendar extends Calendar<CalendarEvent, CalendarResource> {}

    interface Props {
        localizer: DateLocalizer;
    }
    interface DragAndDropEvent {
        isAllDay?: boolean;
        resourceId?: string | number;
    }
    const DragAndDropCalendar = withDragAndDrop<CalendarEvent, CalendarResource>(MyCalendar);
    const handleEventMove = ({ isAllDay, resourceId }: DragAndDropEvent) => {
        console.log(isAllDay, resourceId);
    };
    const DnD = ({ localizer }: Props) => (
        <DragAndDropCalendar
            events={getEvents()}
            views={allViews}
            step={60}
            showMultiDayTimes
            defaultDate={new Date(2015, 3, 1)}
            localizer={localizer}
            selectable={true}
            resizable={true}
            onEventDrop={handleEventMove}
            onEventResize={handleEventMove}
            onDragStart={console.log}
            onDropFromOutside={console.log}
            dragFromOutsideItem={() => getEvents()[0]}
            draggableAccessor={() => true}
            resizableAccessor={() => true}
            elementProps={{ id: "myCalendar" }}
            components={{
                event: Event,
                agenda: {
                    event: EventAgenda,
                },
                work_week: {
                    event: Event,
                },
                toolbar: Toolbar,
                eventWrapper: EventWrapper,
            }}
        />
    );

    const localizer = momentLocalizer(moment);

    <DnD localizer={localizer} />;
}

// overriding 'views' props, with custom day view
{
    interface DayComponentProps {
        date: stringOrDate;
    }
    class DayComponent extends React.Component<DayComponentProps> {
        static title() {
            return "title";
        }

        static navigate() {
            return new Date();
        }
    }
    // supplying object to 'views' prop with only some of the supported views.
    // A view can be a boolean or implement title() and navigate()
    <Calendar
        localizer={momentLocalizer(moment)}
        views={{
            day: DayComponent,
            work_week: true,
        }}
    />;
}

// overriding 'views' props, with custom day view using ViewProps interface
{
    class DayComponent extends React.Component<ViewProps> {
        static title() {
            return "title";
        }

        static navigate() {
            return new Date();
        }
    }
    // supplying object to 'views' prop with only some of the supported views.
    // A view can be a boolean or implement title() and navigate()
    <Calendar
        localizer={momentLocalizer(moment)}
        views={{
            day: DayComponent,
            work_week: true,
        }}
    />;
}

// optional 'localizer' prop
{
    <Calendar localizer={momentLocalizer(moment)} />;
}

{
    class MyCalendar extends Calendar<CalendarEvent, CalendarResource> {}

    // Full API Example Test - based on API Documentation
    // http://intljusticemission.github.io/react-big-calendar/examples/index.html#api
    class FullAPIExample extends React.Component<CalendarProps<CalendarEvent, CalendarResource>> {
        render() {
            return (
                <MyCalendar
                    {...this.props}
                    date={new Date()}
                    getNow={() => new Date()}
                    view={"day"}
                    events={getEvents()}
                    onNavigate={(newDate: Date, view: View, action: NavigateAction) => {}}
                    onView={(view: View) => {}}
                    onSelectSlot={slotInfo => {
                        const start = slotInfo.start;
                        const end = slotInfo.end;
                        const slots = slotInfo.slots;
                    }}
                    onSelectEvent={event => {}}
                    onKeyPressEvent={event => {}}
                    onSelecting={slotInfo => {
                        const start = slotInfo.start;
                        const end = slotInfo.end;
                        return true;
                    }}
                    dayLayoutAlgorithm={customLayoutAlgorithm}
                    showAllEvents={false}
                    views={["day"]}
                    toolbar={true}
                    popup={true}
                    popupOffset={20}
                    onShowMore={(events, date) => {
                        console.log("onShowMore fired, events: %O, date: %O", events, date);
                    }}
                    doShowMoreDrillDown={true}
                    selectable={true}
                    step={20}
                    rtl={true}
                    eventPropGetter={(event, start, end, isSelected) => ({ className: "some-class" })}
                    titleAccessor={"title"}
                    tooltipAccessor={"tooltip"}
                    allDayAccessor={(event: CalendarEvent) => !!event.allDay}
                    startAccessor={"start"}
                    endAccessor={(event: CalendarEvent) => event.endDate || event.start}
                    min={new Date()}
                    max={new Date()}
                    scrollToTime={new Date()}
                    enableAutoScroll={false}
                    formats={{
                        dateFormat: "h a",
                        agendaDateFormat: (date: Date, culture?: Culture, localizer?: DateLocalizer) => "some-format",
                        dayRangeHeaderFormat: (range: DateRange, culture?: Culture, localizer?: DateLocalizer) =>
                            "some-format",
                    }}
                    messages={{
                        date: <div>Date</div>,
                        time: <div>Time</div>,
                        event: <div>Event</div>,
                        allDay: <div>All Day</div>,
                        week: <div>Week</div>,
                        work_week: <div>Work Week</div>,
                        day: <div>Day</div>,
                        month: <div>Month</div>,
                        previous: <div>Back</div>,
                        next: <div>Next</div>,
                        yesterday: <div>Yesterday</div>,
                        tomorrow: <div>Tomorrow</div>,
                        today: <div>Today</div>,
                        agenda: <div>Agenda</div>,
                        noEventsInRange: <div>There are no events in this range.</div>,
                        showMore: (total, remainingEvents, events) =>
                            `+${total} more. Remaining: ${remainingEvents[0].title}. Events: ${events.length}`,
                    }}
                    timeslots={24}
                    defaultView={"month"}
                    className={"my-calendar"}
                    elementProps={{ id: "myCalendar" }}
                    components={{
                        event: Event,
                        agenda: {
                            event: EventAgenda,
                        },
                        toolbar: Toolbar,
                        eventWrapper: EventWrapper,
                        header: CustomHeader,
                        resourceHeader: ResourceHeader,
                        showMore: ShowMoreButton,
                    }}
                    dayPropGetter={customDayPropGetter}
                    slotPropGetter={customSlotPropGetter}
                    slotGroupPropGetter={customGroupSlotPropGetter}
                    defaultDate={new Date()}
                    resources={getResources()}
                    resourceAccessor={event => event.resourceId}
                    resourceIdAccessor={resource => resource.id}
                    resourceTitleAccessor={resource => resource.title}
                    style={{ height: 500 }}
                />
            );
        }
    }

    const localizer = globalizeLocalizer(globalize);
    <FullAPIExample localizer={localizer} />;
}

// Test fixtures
function getEvents(): CalendarEvent[] {
    const events: CalendarEvent[] = [
        new CalendarEvent("All Day Event", new Date(2015, 3, 0), new Date(2015, 3, 0), true),
        new CalendarEvent("Long Event", new Date(2015, 3, 7), new Date(2015, 3, 10)),
        new CalendarEvent("DTS STARTS", new Date(2016, 2, 13, 0, 0, 0), new Date(2016, 2, 20, 0, 0, 0)),
        new CalendarEvent("DTS ENDS", new Date(2016, 10, 6, 0, 0, 0), new Date(2016, 10, 13, 0, 0, 0)),
        new CalendarEvent("Some Event", new Date(2015, 3, 9, 0, 0, 0), new Date(2015, 3, 9, 0, 0, 0)),
        new CalendarEvent(
            "Conference",
            new Date(2015, 3, 11),
            new Date(2015, 3, 13),
            undefined,
            "Big conference for important people",
        ),
        new CalendarEvent(
            "Meeting",
            new Date(2015, 3, 12, 10, 30, 0, 0),
            new Date(2015, 3, 12, 12, 30, 0, 0),
            undefined,
            "Pre-meeting meeting, to prepare for the meeting",
        ),
        new CalendarEvent(
            "Lunch",
            new Date(2015, 3, 12, 12, 0, 0, 0),
            new Date(2015, 3, 12, 13, 0, 0, 0),
            undefined,
            "Power lunch",
        ),
        new CalendarEvent("Meeting", new Date(2015, 3, 12, 14, 0, 0, 0), new Date(2015, 3, 12, 15, 0, 0, 0)),
        new CalendarEvent(
            "Happy Hour",
            new Date(2015, 3, 12, 17, 0, 0, 0),
            new Date(2015, 3, 12, 17, 30, 0, 0),
            undefined,
            "Most important meal of the day",
        ),
        new CalendarEvent("Dinner", new Date(2015, 3, 12, 20, 0, 0, 0), new Date(2015, 3, 12, 21, 0, 0, 0)),
        new CalendarEvent("Birthday Party", new Date(2015, 3, 13, 7, 0, 0), new Date(2015, 3, 13, 10, 30, 0)),
        new CalendarEvent(
            "Alice's break",
            new Date(2015, 3, 14, 20, 0, 0, 0),
            new Date(2015, 3, 14, 21, 0, 0, 0),
            undefined,
            undefined,
            "alice",
        ),
        new CalendarEvent(
            "Bob's break",
            new Date(2015, 3, 15, 7, 0, 0),
            new Date(2015, 3, 15, 10, 30, 0),
            undefined,
            undefined,
            "bob",
        ),
    ];
    return events;
}

function getResources(): CalendarResource[] {
    return [new CalendarResource("alice", "Alice"), new CalendarResource("bob", "Bob")];
}

class EventAgenda extends React.Component<EventProps<CalendarEvent>> {
    render() {
        // const { label } = this.props;
        return (
            <div>
                <div>Calendar Events</div>
            </div>
        );
    }
}

class CustomHeader extends React.Component<HeaderProps> {
    render() {
        return <div>Custom header</div>;
    }
}

const customDayPropGetter = (date: Date) => {
    if (date.getDate() === 7 || date.getDate() === 15) {
        return {
            className: "special-day",
            style: {
                border: "solid 3px " + (date.getDate() === 7 ? "#faa" : "#afa"),
            },
        };
    } else return {};
};

const customSlotPropGetter = (date: Date) => {
    if (date.getDate() === 7 || date.getDate() === 15) {
        return {
            className: "special-day",
        };
    } else return {};
};

const customGroupSlotPropGetter = () => {
    return {
        className: "slot-group",
    };
};

const customLayoutAlgorithm: DayLayoutFunction<CalendarEvent> = (args: {
    events: CalendarEvent[];
    minimumStartDifference: any;
    slotMetrics: any;
    accessors: any;
}) => {
    // This is where the events would get styled in an actual algorithm, but for TS test we just want to confirm it returns
    return args.events.map(e => {
        return { event: e, style: {} };
    });
};

function Event(props: EventProps<CalendarEvent>) {
    return (
        <span>
            <strong>{props.event.title}</strong>
            {props.event.desc && ":  " + props.event.desc}
        </span>
    );
}

function EventWrapper(props: EventWrapperProps<CalendarEvent>) {
    const { continuesEarlier, event, label, accessors = {}, style } = props;
    return (
        <div style={style}>
            <div>
                {continuesEarlier}-{label}-{accessors.title && event && accessors.title(event)}
            </div>
        </div>
    );
}

function ResourceHeader(props: ResourceHeaderProps<CalendarResource>) {
    return (
        <span>
            <strong>{props.resource.title}</strong>
            {props.resource.id}
        </span>
    );
}

function ShowMoreButton(props: ShowMoreProps<CalendarEvent>) {
    return (
        <div>
            <div>Show more</div>
            <p>All events: {props.events.length}</p>
            <p>Remaining: {props.remainingEvents.length}</p>
        </div>
    );
}

class Toolbar extends React.Component<ToolbarProps<CalendarEvent, CalendarResource>> {
    render() {
        const { date, label, view } = this.props;
        return (
            <div>
                <div>
                    {date.toJSON()}-{label}-{view}
                </div>
            </div>
        );
    }
}

// Test components.month
{
    const localizer: DateLocalizer = momentLocalizer(moment);

    const header: React.FC<HeaderProps> = ({ date, label, localizer }) => <>Header</>;

    const dateHeader: React.FC<DateHeaderProps> = ({ date, drilldownView, isOffRange, label, onDrillDown }) => (
        <>DateHeader</>
    );

    const event: React.FC<EventProps> = ({
        event,
        title,
        continuesPrior,
        continuesAfter,
        isAllDay,
        localizer,
        slotStart,
        slotEnd,
    }) => {
        const { formats, propType, startOfWeek, format, messages } = localizer;
        return <>Event</>;
    };

    const Basic = ({ localizer }: CalendarProps) => (
        <Calendar events={[]} localizer={localizer} components={{ month: { header, dateHeader, event } }} />
    );

    <Basic localizer={localizer} />;
}

// test OnRangeChange return types
{
    interface Props {
        localizer: DateLocalizer;
    }
    const Basic = ({ localizer }: Props) => (
        <Calendar
            events={getEvents()}
            views={allViews}
            step={60}
            showMultiDayTimes
            defaultDate={new Date(2015, 3, 1)}
            localizer={localizer}
            onRangeChange={(range, view) => {
                console.log("onRangeChange fired, range: %O, view: %O", range, view);
            }}
        />
    );

    const localizer = momentLocalizer(moment);

    <Basic localizer={localizer} />;
}

// Test Week and TimeGrid types
class MyWorkWeek extends Week {
    render() {
        const { date } = this.props;
        const range = MyWorkWeek.range(date);
        return <TimeGrid {...this.props} range={range} eventOffset={15} />;
    }
}

MyWorkWeek.range = date => {
    const start = date;
    return [start, new Date(start.setDate(start.getDate() + 1))];
};

MyWorkWeek.navigate = (date, action) => {
    const week = 7 * 24 * 60 * 60 * 1000; // week in milliseconds
    switch (action) {
        case Navigate.PREVIOUS:
            return new Date(date.valueOf() - week);
        case Navigate.NEXT:
            return new Date(date.valueOf() + week);
        default:
            return date;
    }
};

MyWorkWeek.title = date => {
    return `My awesome week: ${date.toLocaleDateString()}`;
};

class MyWeek extends Week {
    render() {
        const { date } = this.props;
        const range = MyWeek.range(date);
        return <TimeGrid {...this.props} range={range} eventOffset={15} />;
    }
}

MyWeek.range = date => {
    const start = date;
    return [start, new Date(start.setDate(start.getDate() + 1))];
};

MyWeek.navigate = (date, action) => {
    return date;
};

MyWeek.title = date => {
    return `My awesome week: ${date.toLocaleDateString()}`;
};

// Test Day types
class MyDay extends Day {
    render() {
        const { date } = this.props;
        return date.toString();
    }
}

// Using backgroundEvents
{
    <Calendar backgroundEvents={getEvents()} localizer={momentLocalizer(moment)} />;
}

// defaultView initializer
{
    const localizer = dateFnsLocalizer(dateFnsConfig);

    const MonthView = () => <Calendar defaultView={Views.MONTH} localizer={localizer} />;

    const WeekView = () => <Calendar defaultView={Views.WEEK} localizer={localizer} />;

    const WorkWeekView = () => <Calendar defaultView={Views.WORK_WEEK} localizer={localizer} />;

    const DAYView = () => <Calendar defaultView={Views.DAY} localizer={localizer} />;

    const AgendaView = () => <Calendar defaultView={Views.AGENDA} localizer={localizer} />;
}

// DateLocalizer API
{
    const localizer = luxonLocalizer(moment);
    const date = new Date(2022, 11, 1);

    // $ExpectType StartOfWeek
    const firstOfWeek = localizer.startOfWeek("en");
    // $ExpectType Date
    localizer.startOf(date, "week", firstOfWeek);
    // $ExpectType Date
    localizer.endOf(date, "week", firstOfWeek);

    // $ExpectType Date[]
    localizer.range(new Date(2022, 11, 1), new Date(2022, 11, 3));
}
