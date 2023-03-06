













  <template>
 
    <v-container>
        <v-row no-gutters>
          
          <v-col v-for = "task in tasks" :key="task._id">
            <v-card class = "pa-1" >
                <v-img height="250" :src="`${task.image}`"></v-img>
              <v-btn small outlined>
                {{ task.status }}
              </v-btn>
              <v-card-title class="headline">
                {{ task.title }}
              </v-card-title>
              <v-card-text>
                <p>{{ task.content }}</p>
              </v-card-text>
            </v-card>
    
          </v-col>
        </v-row>
      </v-container>
    </template>
  
  <script>
  import API from './api';
  
  
    export default {
      name: 'Home',
      data(){
        return {
          tasks : [],
        }
      },
      async created() {
        this.tasks = await API.getAllTaks();
  
      }
  
    }
  </script>
  








  



  <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Click Me
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


<template>
  <v-card>
    <v-list-item-group>
      <v-list-item v-for="(todo, index) in todos" :key="index">
        <v-checkbox v-model="todo.completed" color="primary"></v-checkbox>
        <v-list-item-content>
          <v-list-item-title v-text="todo.title"></v-list-item-title>
          <v-list-item-subtitle v-text="todo.content"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon small @click="editTodo(index)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon small @click="deleteTodo(index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list-item-group>
  </v-card>
</template>



<template>
  <v-container class="center-container" fluid>
    <v-alert bored="left" close-text="Close Alert" color="green accent-4" dark dismissable v-if="this.$route.params.message">{{ this.$route.params.message }}</v-alert>

    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        class="mx-2"
      fab
      dark
      color="indigo"
      v-bind="attrs"
  v-on="on"
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
        </v-btn>
      </template>
        <v-card>
          <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
              <h2>New Todo</h2>
              <v-divider></v-divider>
              <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
                <v-text-field label="Title" v-model="post.title" prepend-icon="mdi-note" :rules="rules"></v-text-field>
                <v-text-field label="Status" v-model="post.status" prepend-icon="mdi-view-list" :rules="rules"></v-text-field>
                <v-text-field label="Content" v-model="post.content" prepend-icon="mdi-note-plus" :rules="rules"></v-text-field>
                <v-file-input @change="selectFile" show-size counter muliple label="Add Image" :rules="rules"></v-file-input>
                <v-btn type="submit" class="mt-3" color="primary"> Add Todo</v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
      
            </v-dialog>
 
    <v-row class="mx-auto" no-gutters>
          
          <v-col cols="8" sm="8" class="p-2 text-center" v-for = "task in tasks" :key="task._id">
          
            <v-card class = "pa-1" >
           
               
              <v-checkbox v-model="task.completed" :label=task.status ></v-checkbox>
                
             
              <v-card-title class="headline">
                {{ task.title }}
              </v-card-title>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">mdi-dots-vertical</v-icon>
              </template>
              
              <h2>{{ task.content }}</h2>
              <p>{{ task.created }}</p>
              
            </v-card>
    
          </v-col>
        </v-row>
  </v-container>
</template>






static async createTodo(req,res){
  const post= req.body;
  const imagename = req.file.filename;
  post.image = imagename;
  try {
       await Post.create(post);
       res.status(201).json({message : "Task Created Succesfully!"});
      
  } catch (err) {
      res.status(400).json({message : err.message});
      
  }
}









<script>


const Post = require('../models/posts');


module.exports = class API {
    //fetch ALL
    static async fetchAllPost(req,res){
        try {
            const post = await Post.find();
            res.status(200).json(post);
            
        } catch (err) {
            res.status(404).json({message: err.message});
            
        }
    }

    //fetch by ID
    static async fetchbyID(req,res){
        const id = req.params.id;
        try {
            const post = await Post.findById(id);
            req.status(200).json({post});
            
        } catch (err) {
            req.status(404).json({message : err.message});

            
        }
    }
    //Create a ToDo
    static async createTodo(req,res){
        const post= req.body;
       
        try {
             await Post.create(post);
             res.status(201).json({message : "Task Created Succesfully!"});
            
        } catch (err) {
            res.status(400).json({message : err.message});
            
        }
    }
     //Update a ToDo
     static async updateTodo(req,res){
        const id=params.id;
        const newPost = req.body;
        try {
            await Post.findByIdAndUpdate(id,newPost);
            res.status(200).json({message : 'Data updated'});
            
        } catch (error) {
            res.status(404).json({message : err.message});

            
        }
    }
     //Delete  a ToDo
     static async deleteTodo(req,res){
        const id = req.params.id;
        try {
            const result = await Post.findByIdAndDelete(id);
            res.status(200).json({message : 'Deleted Succesfully'});
        } catch (err) {
            res.status(404).json({message : err.message});
            
        }
         }
}
</script>
 

props: {
  task: {
    type: Object,
    required: true,
  },
},
methods: {
  async updateTaskStatus() {
    const post = await Post.findById(this.task._id);
    post.status = this.task.status;
    await post.save();
  },
},
watch: {
  "task.status": {
    handler: "updateTaskStatus",
    immediate: false,
  },
},