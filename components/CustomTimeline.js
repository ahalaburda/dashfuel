import generateFakeData from "@/services/generateFakeData";
import moment from "moment";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import CreateItemModal from "./Modal/CreateItem";
import EditItemModal from "./Modal/EditItem";

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
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [defaultTimeStart, setDefaultTimeStart] = useState();
  const [defaultTimeEnd, setDefaultTimeEnd] = useState();
  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [createNewItem, setCreateNewItem] = useState();
  const [editItem, setEditItem] = useState();

  const initialData = generateFakeData();
  const defaultTimeStartInitial = moment().startOf("day").toDate();
  const defaultTimeEndInitial = moment().startOf("day").add(1, "day").toDate();

  useEffect(() => {
    setGroups(initialData.groups);
    setItems(initialData.items);
    setDefaultTimeStart(defaultTimeStartInitial);
    setDefaultTimeEnd(defaultTimeEndInitial);
    setIsReady(true);
  }, []);


  function handleClose() {
    setShowCreateModal(false);
    setShowEditModal(false);
  };

  function handleItemMove (itemId, dragTime, newGroupOrder) {
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

  function handleItemResize (itemId, time, edge) {
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

  function onItemCreate (groupId, time) {
    setCreateNewItem({ groupId, time });
    setShowCreateModal(true);
  };

  function handleItemCreate (data) {
    const newItem = {
      id: items.length + 1,
      group: createNewItem.groupId,
      title: data.target[0].value,
      start: new Date(data.target[1].value).getTime(),
      end: new Date(data.target[2].value).getTime(),
    };
    setItems([...items, newItem]);
    setCreateNewItem(null);
  };

  function onItemEdit (itemId, e, time) {
    const item = items.find((item) => item.id === itemId);
    setEditItem(item);
    setShowEditModal(true);
  };

  const handleItemEdit = (itemId, data) => {
    const updatedItems = items.map((item) =>
      item.id === itemId
        ? {
            ...item,
            title: data.target[0].value,
            start: new Date(data.target[1].value).getTime(),
            end: new Date(data.target[2].value).getTime(),
          }
        : item
    );
    setItems([...updatedItems]); // Use a new array reference
    setEditItem(null);
  };

  function handleItemDelete (itemId){
    const updateItems = items.filter((item) => item.id !== itemId);
    setItems(updateItems);
    setEditItem(null);
  };

  if (!isReady) return null
  return (
    <div data-testid="CustomTimeline">
      <Timeline
        id="timeline"
        groups={groups}
        items={items}
        keys={keys}
        fullUpdate
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        canMove={true}
        canResize={"both"}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        onItemMove={handleItemMove}
        onItemResize={handleItemResize}
        onItemDoubleClick={onItemEdit}
        onCanvasClick={onItemCreate}
      />
      {createNewItem && (
        <CreateItemModal
          show={showCreateModal}
          selectedStartTime={createNewItem.time}
          handleClose={handleClose}
          handleSubmit={(e) => {
            e.preventDefault();
            handleItemCreate(e);
          }}
        />
      )}
      {editItem && (
        <EditItemModal
          item={editItem}
          show={showEditModal}
          handleClose={handleClose}
          handleDelete={() => handleItemDelete(editItem.id)}
          handleSubmit={(e) => {
            e.preventDefault();
            handleItemEdit(editItem.id, e);
          }}
        />
      )}
    </div>
  );
}
