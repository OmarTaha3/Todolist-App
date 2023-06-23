"use client";
import React, { FormEventHandler, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTask,
    });
    setNewTask("");
    setOpenModal(false);
    router.refresh();
  };
  return (
    <div>
      <button
        onClick={() => setOpenModal(true)}
        className="btn btn-primary w-full text-white  "
      >
        Add new task <AiOutlinePlus className="ml-2" size={20} />{" "}
      </button>
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
