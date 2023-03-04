import axios from 'axios';
const url = "/api/post";
var FormData = require('form-data');

export default class API {
    //method to get all the posts from server

     static async getAllTaks() {

        const res = await axios.get(url);
        return res.data;

     }

      //method to get Task by id

      static async getTaksbyID(id) {

        const res = await axios.get(`${url}/${id}`);
        return res.data;

     }

      //method to add a task

      static async addTask(post) {

        const res = await axios.post(url,post);
        return res.data;

     }

     //method to update a task

     static async updateTask(id , post) {
      const data = {title: post.get('title'), status: post.get('status'), content: post.get('content')}
      console.log(data.title)
         console.log("MWW : " + data);
        const res = await axios.patch(`${url}/${id}`,JSON.stringify(data));
        return res.data;

     }

     //method to delete a task

     static async deleteTask(id) {

        const res = await axios.delete(`${url}/${id}`);
        return res.data;

     }
}