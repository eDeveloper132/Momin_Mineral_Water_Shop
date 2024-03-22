const BASE_URL = "http://localhost:9038";
const container = document.querySelector(".container");
const author = document.querySelector("#author");
const name = document.querySelector("#name");
const content = document.querySelector("#content");
const newauthor = document.querySelector("#newauthor");
const newname = document.querySelector("#newname");
const newcontent = document.querySelector("#newcontent");

const RenderPost = (Data) => {
  console.log(Data);
  let sr = -1;
  container.innerHTML = "";
  for (const item of Data) {
    sr++;
    container.innerHTML += `
        <tr class="justify-content-space-between">
        <td scope="row">${sr}</td>
        <td>${item.author}</td>
        <td>${item.name}</td>
        <td>${item.content}</td>
        <td><a href="./update.html"><button class="btn btn-primary" onclick="UpdateData('${item._id}')">Update</button></a></td>
        <td><button class="btn btn-danger" onclick="DeleteData('${item._id}')">Delete</button></td>
      </tr>
      `;
  }
};

const UpdateData = async (id) => {
  console.log(id);
  try {
    let newauthore = await newauthor.value;
    let newnam = await newname.value;
    let newcontente = await newcontent.value;
    const res = await fetch(BASE_URL + "/posts/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newnam,
        author: newauthore,
        content: newcontente,
      }),
    });

    const json = await res.json();
    const Data = await json.data;
    // console.log(json);
    console.log(Data);

    // await FetchData();
    RenderPost(Data);
  } catch (error) {
    console.error("Error updating post:", error);
  }
};

const FetchData = async () => {
  const res = await fetch(BASE_URL + "/posts");
  const data = await res.json();
  console.log(data);
  RenderPost(data.Data);
};
FetchData();

const AddData = async () => {
  const body = {
    author: author.value,
    name: name.value,
    content: content.value,
  };
  const res = await fetch(BASE_URL + "/posts", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });
  const json = await res.json();
  console.log(json);
  FetchData();
};
const DeleteData = async (id) => {
  const res = await fetch(BASE_URL + "/posts/" + id, {
    method: "DELETE",
  });
  const json = await res.json();
  console.log(json);
  FetchData();
};

window.AddData = AddData;
window.DeleteData = DeleteData;
window.FetchData = FetchData;
window.RenderPost = RenderPost;
window.UpdateData = UpdateData;
