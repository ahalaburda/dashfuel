import generateFakeData from "@/services/generateFakeData";
import moment from "moment";
import { useEffect, useState } from "react";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";

const keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "title",
};
Object.freeze(keys);

export default function CustomTimeline() {
  const [defaultTimeStart, setDefaultTimeStart] = useState();
  const [defaultTimeEnd, setDefaultTimeEnd] = useState();
  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const respData = generateFakeData();
    const defaultTimeStartInitial = moment().startOf("day").toDate();
    const defaultTimeEndInitial = moment()
      .startOf("day")
      .add(1, "day")
      .toDate();

    setGroups(respData.groups);
    setItems(respData.items);
    setDefaultTimeStart(defaultTimeStartInitial);
    setDefaultTimeEnd(defaultTimeEndInitial);
  }, []);

  const handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const group = groups[newGroupOrder];
    const updateItems = items.map((item) =>
      item.id === itemId
        ? Object.assign({}, item, {
            start: dragTime,
            end: dragTime + (item.end - item.start),
            group: group.id,
          })
        : item
    );
    setItems(updateItems);
    console.log("Moved", itemId, dragTime, newGroupOrder);
  };

  const handleItemResize = (itemId, time, edge) => {
    const updateItems = items.map((item) =>
      item.id === itemId
        ? Object.assign({}, item, {
            start: edge === "left" ? time : item.start,
            end: edge === "left" ? item.end : time,
          })
        : item
    );
    setItems(updateItems);
    console.log("Resized", itemId, time, edge);
  };

  return (
    <div data-testid="CustomTimeline">
      <Timeline
        id="timeline"
        groups={groups}
        items={items}
        keys={keys}
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        canMove={true}
        canResize="both"
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        onItemMove={handleItemMove}
        onItemResize={handleItemResize}
        fullUpdate
      />
    </div>
  );
}
