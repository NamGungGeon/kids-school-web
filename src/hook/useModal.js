import { observable } from "mobx";

const modal = observable({
  body: null
});

export const useModal = () => {
  return [
    modal.body,
    body => {
      modal.body = body;
    }
  ];
};
