const BASE_URL = "http://localhost:9038"
const container = document.querySelector(".container");
const author = document.querySelector("#author");
const name = document.querySelector("#name");
const content = document.querySelector("#content");

const RenderPost = (Data) => {
    console.log(Data);
    container.innerHTML = ""
    for (const item of Data) {
        container.innerHTML += 
        `<div>
        <h1>${item.author}</h1><br>
        <h3>${item.name}</h3><br>
        <p>${item.content}</p><br>
        <button onclick="DeleteData('${item._id}')">Delete</button>
        </div>`
    }
}


const FetchData = async() =>
{
    const res = await fetch(BASE_URL+"/posts")
    const Data = await res.json()
    console.log(Data);
    RenderPost(Data);
}
FetchData();
// {
//     "_id": "65f9e613fb8df82f4dd3f46d",
//     "author": "Ilyas",
//     "name": "ilyas",
//     "content": "helow World",
//     "createdAt": "2024-03-19T19:22:59.678Z",
//     "updatedAt": "2024-03-19T19:22:59.678Z",
//     "__v": 0
// }
const AddData = async () => {
    const body = {
        author: author.value,
        name: name.value,
        content: content.value
    }
    const res = await fetch(BASE_URL + "/posts", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(body)
    })
    const json = await res.json()
    console.log(json);
    FetchData();
}
const DeleteData = async(id) =>
{
    const res = await fetch(BASE_URL + "/posts/" + id , 
    {
        method: "DELETE"
    })
    const json = await res.json();
    console.log(json);
    FetchData();
}

window.AddData = AddData;
window.DeleteData = DeleteData;
window.FetchData = FetchData;
window.RenderPost = RenderPost;