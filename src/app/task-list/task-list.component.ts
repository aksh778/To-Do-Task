import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  taskListForm: FormGroup;
  taskArray: any[];
  isEditTask: boolean;
  editIndex: number;

  constructor() { }

  ngOnInit() {
    this.taskListForm = new FormGroup({
      taskDate: new FormControl(''),
      taskName: new FormControl(''),
      status: new FormControl('')
    });
    this.taskArray = [];
    this.isEditTask = false;
  }
  addTask(taskDetails) {

    if (taskDetails) {
      taskDetails.taskDate = moment(taskDetails.taskDate).format('DD/MM/YYYY');
      this.taskArray.push(taskDetails);
      this.taskListForm.reset();
    }
  }
  onDeleteTask(index) {
    window.alert('Task deleted');
    this.taskArray.splice(index, 1);
  }
  onEdit(task, index) {
    this.isEditTask = true;
    this.editIndex = index;
    const dateMomentObject = moment(task.taskDate, "DD/MM/YYYY");
    const dateObject = dateMomentObject.toDate();
    this.taskListForm.controls['taskDate'].setValue(dateObject);
    this.taskListForm.controls['taskName'].setValue(task.taskName);
    this.taskListForm.controls['status'].setValue(task.status);
  }
  updateTask(taskDetails) {
    taskDetails.taskDate = moment(taskDetails.taskDate).format('DD/MM/YYYY');
    this.taskArray[this.editIndex].taskDate = taskDetails.taskDate;
    this.taskArray[this.editIndex].taskName = taskDetails.taskName;
    this.taskArray[this.editIndex].status = taskDetails.status;
    this.taskListForm.reset();
    this.isEditTask = false;
  }
}
