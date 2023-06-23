"use client";
import { ITask } from "@/types/tasks";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import Modal from "./Modal";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(task.text);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: editTask,
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDelete(false);
    router.refresh();
  };

  return (
    <tr>
      <td className="w-full">{task.text}</td>
      <td className="flex items-center gap-5">
        <FiEdit
          className="hover:text-blue-500 duration-100 cursor-pointer"
          size={25}
          onClick={() => setOpenModalEdit(true)}
        />
        <Modal openModal={openModalEdit} setOpenModal={setOpenModalEdit}>
          <form onSubmit={handleSubmit}>
            <h3 className="font-bold text-lg">Edit Task</h3>
            <div className="modal-action">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full "
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
              />
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          className="hover:text-red-500 duration-100 cursor-pointer"
          size={25}
          onClick={() => setOpenModalDelete(true)}
        />
        <Modal openModal={openModalDelete} setOpenModal={setOpenModalDelete}>
          <h3 className="text-lg">
            Are you sure you want to delete this task ?
          </h3>
          <div>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="btn mt-3 block mx-auto"
            >
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
