// var state = {
//   taskList: [
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//   ],
// };

// backup storage
const state = {
  taskList: [],
};

// DOM Operations
const taskModal = document.querySelector(".task__modal__body");
const taskContents = document.querySelector(".task__contents");

// console.log(taskContents);
// console.log(taskModal);

// Template for the card on screen
const htmlTaskContent = ({ id, title, description, type, url }) => `
  <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
    <div class='card shadow-sm task__card'>
    
      <div class='card-header d-flex justify-content-end task__card__header'>
          <button type='button' class='btn btn-outline-primary mr-1.5' name=${id}>
              <i class='fas fa-pencil-alt name=${id}'></i>
          </button>
          <button type='button' class='btn btn-outline-danger mr-1.5' name=${id} onclick='deleteTask.apply(this, arguments)'>
              <i class='fas fa-trash-alt name=${id}'></i>
          </button>
      </div>
      <div class='card-body'>
          ${
            // url &&
            // `<img width='100%' src=${url} alt='Card Image' class='card-img-top md-3 rounded-lg' />`
            url ?
            `<img width='100%' src=${url} alt='Card Image' class='card-img-top md-3 rounded-lg' />`
            : `<img width='100%' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAA7VBMVEX////x7+Lf3dA7g4JNo6T29vZNTlA/P0ExMTS7vLyenp9AQkL39ejJyL9JSk1gYWNcW1rTpUc4ODojIybU1NDm5dpqaWfU0sZBd3ZMlZf1u1B5eXfw8N/ttk9LpKJOoaVCjo3ToDt7o5ssfHxelI+v0s8+SU3n5+WwsKxUVFOlpaOEhoNtbnAuLDMbHB83NTv06Mrx16Xsw3j0wmnXr2DbtW3Zv4fjypvk17Tz3rTtsj/eu3ru5tXmx37QplCjv7bG1MwAcHKSsai2xrvX6OCRwLp1s7IwlZXC39mntbBlkJFLV1pNhopCamtcfnwLNP4gAAAEfklEQVR4nO3bbVfaSByGcUIQgsSoKVMsxqhA6hMuFNe1bN0SQcBK3e//cXYmEElIQpiekyHp3tcrj8cX/vjPJBM9yeUQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEELRXVQFdCGEsnN5/PGAt6siX1dX7WsBnJ2bUkkralql9F5l+bXnu76UW4WjTkfXFaWdvGZXZ59cqdI+5qn9kaMD5ZZ9AB+Ok7bszC03NcJVvsbT3o2iU80fSY+mWqGWyrVkSFyRPFdkl2GU64Qx5QqbC1H5LLyYfP5YoZhdAZjiJa+FG0MuNV0MZn8vcUx+7+C3wnSEYDRguDFilhkwwAADDDDAAAOMr0hk5jBGt9s11HBPdjDOI/Tjl97d3Z/3f3VDNdnBME63V6/XTw4PD78/hP15IDMY9st37+oLzPl5mCYzGLbGen+7GNrXLGMMqe9YFpjzb4+Bv0RlByNJ/9Q9mMPv3QxPRjJOfJjz4DrLMKYvra6zjGOMrGKkng8TcjnLEsZ/NbvP9tVsfs90MQ+BwazBzP/jkSaM1F9iwm4zkRgyaMmy3LBThZH6J+5x5ttjyFEzAkPOmtQiN58Gqz+w3UeAbu/uhGLuQ8+ZURg2Fqfm6my2iXEOm/0vD18j/qMWjmk0XYz8StKDme+SiCezKMxQXvY0ShEmpjDMwGORmy2SZcyoJfsaZBhjr1jkVnYxNc/mXzQkWcUELXLLTjHGe3BexQyDFv9oUoIxKMKIOWgOnkIs8tkoZRimeLbGFvGD/Bg7bC708txIGYZSxua0MJ1aUiTGDqWwRiQ1GPbbq8/jacHJp/Fi7Fb4YNhoaqnBMMvLpOBmRUymETkYOpoUYVTLNE9dzORZDcMM11iarVpqMOq4QCnm3HJqejRLzGCNhWoGKcHQ7UIJ7mDYhMZkFUNGZ2sx8k87FRj1efI+leW2MfyY6M3vjmaYBoxqm2yNnfowU0v1Ykg1zkI1ZPsYg12RPbvf1bx4MbXXWIt759wmhlCLyeZiBjTqEtOIt9BnTnuLGMPZLtMAw70QOD/iYMJPZIEaZKuTscMd89FMyHwyZLTJXFij7WFUYk1PV/eKt7HKMGS0IWX+zLkdDL27RCyw94VmMUzsRdnTgGwJY0/WU1iWROx1J7LAaGwiGuMckq14Cj3Y2ITHwp45BWOce7sVs8TYKqNHnAmfpdmya6KXmSGNC+t2vjsY6ok5kQU0Q+F7hkzYZSx2NuxSx4s5+7EvFvMy3WC/LOLEyM3XmVCMNTXjp/KrGPnos5hXThwMcQ6WiU1GKMa5u5i/B+ZlYpqbXMiygGkUeJZYqjHF2U96U+eypBvDaUkrplQsFo84Kb+AeasImow2+5T0ZNhgBL3aqL3xajgxR7OOCMyF8zqwNvv3E1fyEU9vn523u2+rCWNy+xXnHXeNr5LOlWPR9aQtuapW4Xy3nxX1av2aOko5cUyu3HY/us3TlQ/cHVwmb6Hbpny9m3zlxDfMoh0BCaIghBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIof9T/wGzlgG5tZp6PAAAAABJRU5ErkJggg==" alt='Card Image' class='card-img-top md-3 rounded-lg' />`
          }
          <h4 class='card-title task__card__title'>${title}</h4>
          <p class='description trim-3-lines text-muted'>${description}</p>
          <div class='tags text-white d-flex flex-wrap'>
            <span class='badge bg-primary m-1'>${type}</span>
          </div>
      </div>
      <div class='card-footer'>
          <button type='button' class='btn btn-outline-primary float-right' data-bs-toggle="modal" data-bs-target="#showTask" onclick='openTask()' id=${id}>Open Task</button>
      </div>
    </div>
  </div>
`;

// Modal Body on >> Clk of Open Task
const htmlModalContent = ({ id, title, description, url }) => {
  const date = new Date(parseInt(id));
  return `
  <div id=${id}>
     ${
       url ?
            `<img width='100%' src=${url} alt='Card Image' class='card-img-top md-3 rounded-lg' />`
            : `<img width='100%' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAA7VBMVEX////x7+Lf3dA7g4JNo6T29vZNTlA/P0ExMTS7vLyenp9AQkL39ejJyL9JSk1gYWNcW1rTpUc4ODojIybU1NDm5dpqaWfU0sZBd3ZMlZf1u1B5eXfw8N/ttk9LpKJOoaVCjo3ToDt7o5ssfHxelI+v0s8+SU3n5+WwsKxUVFOlpaOEhoNtbnAuLDMbHB83NTv06Mrx16Xsw3j0wmnXr2DbtW3Zv4fjypvk17Tz3rTtsj/eu3ru5tXmx37QplCjv7bG1MwAcHKSsai2xrvX6OCRwLp1s7IwlZXC39mntbBlkJFLV1pNhopCamtcfnwLNP4gAAAEfklEQVR4nO3bbVfaSByGcUIQgsSoKVMsxqhA6hMuFNe1bN0SQcBK3e//cXYmEElIQpiekyHp3tcrj8cX/vjPJBM9yeUQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEELRXVQFdCGEsnN5/PGAt6siX1dX7WsBnJ2bUkkralql9F5l+bXnu76UW4WjTkfXFaWdvGZXZ59cqdI+5qn9kaMD5ZZ9AB+Ok7bszC03NcJVvsbT3o2iU80fSY+mWqGWyrVkSFyRPFdkl2GU64Qx5QqbC1H5LLyYfP5YoZhdAZjiJa+FG0MuNV0MZn8vcUx+7+C3wnSEYDRguDFilhkwwAADDDDAAAOMr0hk5jBGt9s11HBPdjDOI/Tjl97d3Z/3f3VDNdnBME63V6/XTw4PD78/hP15IDMY9st37+oLzPl5mCYzGLbGen+7GNrXLGMMqe9YFpjzb4+Bv0RlByNJ/9Q9mMPv3QxPRjJOfJjz4DrLMKYvra6zjGOMrGKkng8TcjnLEsZ/NbvP9tVsfs90MQ+BwazBzP/jkSaM1F9iwm4zkRgyaMmy3LBThZH6J+5x5ttjyFEzAkPOmtQiN58Gqz+w3UeAbu/uhGLuQ8+ZURg2Fqfm6my2iXEOm/0vD18j/qMWjmk0XYz8StKDme+SiCezKMxQXvY0ShEmpjDMwGORmy2SZcyoJfsaZBhjr1jkVnYxNc/mXzQkWcUELXLLTjHGe3BexQyDFv9oUoIxKMKIOWgOnkIs8tkoZRimeLbGFvGD/Bg7bC708txIGYZSxua0MJ1aUiTGDqWwRiQ1GPbbq8/jacHJp/Fi7Fb4YNhoaqnBMMvLpOBmRUymETkYOpoUYVTLNE9dzORZDcMM11iarVpqMOq4QCnm3HJqejRLzGCNhWoGKcHQ7UIJ7mDYhMZkFUNGZ2sx8k87FRj1efI+leW2MfyY6M3vjmaYBoxqm2yNnfowU0v1Ykg1zkI1ZPsYg12RPbvf1bx4MbXXWIt759wmhlCLyeZiBjTqEtOIt9BnTnuLGMPZLtMAw70QOD/iYMJPZIEaZKuTscMd89FMyHwyZLTJXFij7WFUYk1PV/eKt7HKMGS0IWX+zLkdDL27RCyw94VmMUzsRdnTgGwJY0/WU1iWROx1J7LAaGwiGuMckq14Cj3Y2ITHwp45BWOce7sVs8TYKqNHnAmfpdmya6KXmSGNC+t2vjsY6ok5kQU0Q+F7hkzYZSx2NuxSx4s5+7EvFvMy3WC/LOLEyM3XmVCMNTXjp/KrGPnos5hXThwMcQ6WiU1GKMa5u5i/B+ZlYpqbXMiygGkUeJZYqjHF2U96U+eypBvDaUkrplQsFo84Kb+AeasImow2+5T0ZNhgBL3aqL3xajgxR7OOCMyF8zqwNvv3E1fyEU9vn523u2+rCWNy+xXnHXeNr5LOlWPR9aQtuapW4Xy3nxX1av2aOko5cUyu3HY/us3TlQ/cHVwmb6Hbpny9m3zlxDfMoh0BCaIghBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIof9T/wGzlgG5tZp6PAAAAABJRU5ErkJggg==" alt='Card Image' class='card-img-top md-3 rounded-lg' />`
     }
     <strong class='text-muted text-sm'>Created on: ${date.toDateString()}</strong>
     <h2 class='my-3'>${title}</h2>
     <p class='text-muted'>${description}</p>
  </div>
  `;
};

// where we convert json > str (i.e., for local storage)
const updateLocalStorage = () => {
  localStorage.setItem(
    "task",
    JSON.stringify({
      tasks: state.taskList,
    })
  );
};

const loadInitialData = () => {
  const localStorageCopy = JSON.parse(localStorage.task);

  if (localStorageCopy) state.taskList = localStorageCopy.tasks;

  state.taskList.map((cardDate) => {
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
  });
};


// when we update or edit -> save
const handleSubmit = (event) => {
  const id = `${Date.now()}`;
  const input = {
    url: document.getElementById("imageUrl").value,
    title: document.getElementById("taskTitle").value,
    type: document.getElementById("tags").value,
    description: document.getElementById("taskDescription").value,
  };
  // if (input.title === "" || input.tags === "" || input.taskDescription === "") {
  //   return alert("Please fill all the necessary fiels :-)");
  // }


  taskContents.insertAdjacentHTML(
    "beforeend",
    htmlTaskContent({ ...input, id })
  );
  state.taskList.push({ ...input, id });

  updateLocalStorage();
};


const openTask = (e) => {
  if(!e) e = window.event;

  const getTask = state.taskList.find(({id}) => id === e.target.id);
  taskModal.innerHTML = htmlModalContent(getTask);
}

const deleteTask = (e) => {
  if(!e) e = window.event;

  const targetId = e.target.getAttribute("name");
  const type = e.target.tagName;
  const removeTask = state.taskList.filter(({id}) => id !== targetId);
  updateLocalStorage();
  if(type === "BUTTON"){
    return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode
    );
  }else if(type === "I"){
  return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode.parentNode
    );
  }
}