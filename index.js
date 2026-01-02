// var state = {
//     taskList: [
//         {
//             imageUrl: "",
//             taskTitle: "",
//             takType: "",
//             taskDescription: "",
//         },
//         {
//             imageUrl: "",
//             taskTitle: "",
//             takType: "",
//             taskDescription: "",
//         },
//         {
//             imageUrl: "",
//             taskTitle: "",
//             takType: "",
//             taskDescription: "",
//         },
//         {
//             imageUrl: "",
//             taskTitle: "",
//             takType: "",
//             taskDescription: "",
//         },
//         {
//             imageUrl: "",
//             taskTitle: "",
//             takType: "",
//             taskDescription: "",
//         },
//     ]
// }


const state = {
    taskList: [],
}

const taskContents = document.querySelector(".taskContents");
const taskModal = document.querySelector(".task__modal__body");

console.log(taskContents);
console.log(taskModal);

const htmlTaskContent = ({id, title, type, description, url}) => {};