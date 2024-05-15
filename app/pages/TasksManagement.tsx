/* eslint-disable no-unused-vars */
"use client";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { PlusIcon, UpdateIcon } from "../assets/svgs/Icons";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Table from "../components/Table";
import { columns } from "../description/tasks.management";
import {
  createNewTask,
  deleteTask,
  setEditFormData,
  setTasksDetails,
  updateTask
} from "../redux-toolkit/slices/tasks.slice";
import { RootState } from "../redux-toolkit/store";

const API_URL = process.env.NEXT_API_URL;

const TasksManagement = () => {
  const cookie = useCookies();
  const [toggleAddModal, setToggleAddModal] = useState(false);
  const token = cookie.get("token");
  const dispatch = useDispatch();
  const { tasks, updateFormData: updatedData } = useSelector(
    (state: RootState) => state?.tasks
  );
  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
    assignedUser: ""
  });
  const handleChange = (e: any) => {
    const {
      target: { value, name }
    } = e;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (updatedData?._id) {
      const payload = {
        ...updatedData,
        assignedUser: updatedData?.assignedUser?._id,
        taskName: formData?.taskName || updatedData?.taskName,
        description: formData?.description || updatedData?.description
      };
      console.log("updatedData", { ...payload });
      await axios
        .put(
          `${API_URL}/tasks`,
          { ...payload },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then((resp) => {
          if (resp.data) {
            dispatch(updateTask(resp.data.data));
          }
          setToggleAddModal((prev) => !prev);
          toast.success(resp?.data?.message);
          setFormData({
            taskName: "",
            description: "",
            assignedUser: ""
          });
        })
        .catch((e) => {
          console.log("e", e);
          toast.error("Something went wrong!");
        });
    } else {
      await axios
        .post(
          `${API_URL}/tasks`,
          { ...formData },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then((resp) => {
          if (resp.data) {
            dispatch(createNewTask(resp.data.data));
          }
          setToggleAddModal((prev) => !prev);
          toast.success(resp?.data?.message);
          setFormData({
            taskName: "",
            description: "",
            assignedUser: ""
          });
        })
        .catch((e) => {
          console.log("e -> ", e);
          toast.error("Something went wrong!");
        });
    }
  };

  const handleEdit = (editFormData: any) => {
    dispatch(setEditFormData(editFormData));
    setToggleAddModal((prev) => !prev);
  };
  const handleDelete = async (id: any) => {
    await axios
      .delete(`${API_URL}/tasks`, {
        data: {
          id
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        dispatch(deleteTask(id));
        toast.success("Task has been deleted!!");
      })
      .catch((e: any) => {
        console.log("e", e);
        toast.error("Something went wrong!");
      });
  };

  const handleCancelModal = () => {
    setToggleAddModal((prev) => !prev);
    dispatch(setEditFormData({}));
  };

  useEffect(() => {
    const getTasksData = async () => {
      await axios
        .get(`${API_URL}/tasks`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
        .then((resp) => {
          if (resp.data) {
            dispatch(setTasksDetails(resp.data.data));
          }
        });
      // .catch((e) => {
      //   toast.error(e?.response?.data?.message);
      // });
    };
    if (!tasks && token) {
      getTasksData();
    }
  }, []);

  return (
    <>
      <div className="flex w-full justify-between items-center">
        <span className="text-xl font-extrabold">Tasks Management</span>
        <Button
          type="button"
          btnType="primary"
          btnText="Add Task"
          btnIcon={<PlusIcon />}
          handleClick={() => setToggleAddModal((prev) => !prev)}
        />
      </div>
      <Table
        columns={columns}
        data={tasks}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {toggleAddModal && (
        <Modal
          handleCancel={() => handleCancelModal()}
          title={`${
            !!Object.keys(updatedData)?.length ? "Update task" : "Add New Task"
          }`}
        >
          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <input
                  type="text"
                  name="taskName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Task name"
                  required
                  onChange={handleChange}
                  value={formData?.taskName || updatedData?.taskName}
                />
              </div>
              {/* First make get user list API than implement this feature */}
              {/* <div className="col-span-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <select
                  id="category"
                  className="col-span-2 px-5 py-2.5 text-sm text-gray-200 bg-transparent w-full"
                >
                  <option
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    selected
                  >
                    Select User
                  </option>
                  <option
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    value="TV"
                  >
                    TV/Monitors
                  </option>
                  <option
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    value="PC"
                  >
                    PC
                  </option>
                  <option
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    value="GA"
                  >
                    Gaming/Console
                  </option>
                  <option
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    value="PH"
                  >
                    Phones
                  </option>
                </select>
              </div> */}
              <div className="col-span-2">
                <textarea
                  name="description"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write task description here"
                  onChange={handleChange}
                  value={formData?.description || updatedData?.description}
                ></textarea>
              </div>
            </div>
            <Button
              type="submit"
              btnType="primary"
              btnText={
                Object.keys(updatedData)?.length ? "Update Task" : "Add Task"
              }
              btnIcon={
                <span className="mr-1">
                  {Object.keys(updatedData)?.length ? (
                    <UpdateIcon />
                  ) : (
                    <PlusIcon />
                  )}
                </span>
              }
            />
          </form>
        </Modal>
      )}
    </>
  );
};

export default TasksManagement;
