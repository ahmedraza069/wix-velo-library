// Repeater-er first item default active, hover korle oi item active, baki gula inactive.

export function initRepeaterHover({
  repeater = "#repeater8",
  box = "#box58545247",
  activeColor = "#BDF003",
  inactiveColor = "#FFFFFF",
  resetDelay = 150
} = {}) {
  let resetTimer = null;

  function paint(id) {
    $w(repeater).forEachItem(($item, itemData) => {
      $item(box).style.backgroundColor =
        itemData._id === id ? activeColor : inactiveColor;
    });
  }

  function resetToFirst() {
    const data = $w(repeater).data;
    paint(data.length ? data[0]._id : null);
  }

  // Repeater load/update hole first item active
  $w(repeater).onItemReady(() => {
    clearTimeout(resetTimer);
    resetTimer = setTimeout(resetToFirst, 100);
  });

  // Hover: ekbar attach, shob item-e kaj kore
  $w(box).onMouseIn((event) => {
    clearTimeout(resetTimer);
    paint(event.context.itemId);
  });

  // Mouse bair hole first item-e fera
  $w(box).onMouseOut(() => {
    clearTimeout(resetTimer);
    resetTimer = setTimeout(resetToFirst, resetDelay);
  });

  // Mobile (hover nai)
  $w(box).onClick((event) => {
    paint(event.context.itemId);
  });

  resetToFirst();
}