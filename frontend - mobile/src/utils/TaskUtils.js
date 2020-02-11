function orderListToDoneState(list = []) {
  return [
    ...list.filter(item => !item.isDone),
    ...list.filter(item => item.isDone),
  ];
}

export {orderListToDoneState};
