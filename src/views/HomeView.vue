<template>


  <v-container class="content-container" fluid>
    <div class="background-image"></div>
    <div class="rounded-image">
      <v-avatar size="120">
      <v-img
        src="https://cdn.vuetifyjs.com/images/john.jpg"
        alt="John"
      ></v-img>
    </v-avatar>
    </div>
    
    <div class="addtodo">
    <v-dialog
      v-model="dialog"
      width="500"
    >

      <template v-slot:activator="{ on, attrs }">
        <v-btn
      
      fab
      dark
      color="success"
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
             
                <v-btn type="submit" class="mt-3" color="primary"> Add Todo</v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
      
            </v-dialog>
          </div>
            
 
    <v-row no-gutters>

      
          
          <v-col v-for = "task in tasks"  :key="task._id" cols="4" sm="10" class="p-2 text-center" >
          
            <v-card 
    outlined color="transparent">
           
               
              
                
             
              <v-list-item three-line>
                <!-- <v-checkbox intermediate  ></v-checkbox> -->
                <v-switch
      v-model="people"
      color="primary"
      
      value="1"
      hide-details
      :label=task.status
      @click="updateTaskStatus(task._id)"
    ></v-switch>
                <v-list-item-subtitile><span class="title">{{ task.title }}</span><span class="content">{{ task.content }}</span></v-list-item-subtitile>
                
              
              
              <v-list-item-subtitle>
              <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
          plain
            v-bind="attrs"
            v-on="on" :to="{name: edit-form, params: {id: task._id}}"
            
          >Edit </v-btn><br>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            
            <v-col sm="10" class="mx-auto">
              <h2>Editing</h2>
              <v-divider></v-divider>
              <v-form ref="form" @submit.prevent="updateForm(task._id, task.title, task.status, task.content)" class="pa-5" enctype="multipart/form-data">
                <v-text-field label="Title" v-model="task.title" prepend-icon="mdi-note" ></v-text-field>
                <v-text-field label="Status" v-model="task.status" prepend-icon="mdi-view-list" ></v-text-field>
                <v-text-field label="Content" v-model="task.content" prepend-icon="mdi-note-plus" ></v-text-field>
           
                <v-btn type="submit" class="mt-3" color="success"> Update</v-btn>
              </v-form>
            </v-col>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

      
          
          <v-btn
          plain
            color="error"
            v-bind="attrs"
            v-on="on"
            @click="removePost(task._id)"
          >DELETE</v-btn>
        
    </v-list-item-subtitle>
  </v-list-item>
            
              
            </v-card>
    
          </v-col>
        </v-row>





        
  </v-container>
</template>

<script>
import API from './api';

export default {
  props: {
  task: {
    type: Object,
    required: true,
  },
},
computed: {
    completedValue() {
      return this.task.status === "completed" ? "completed" : "uncompleted";
    },
  },
  name: 'Home',
  data() {
    return {
      tasks: [],
      dialog: false,
      rules: [(value)=> !!value || "This filed si required!"],
      post: {
        title:"",
        status:"",
        content:"",
       
      },
     
    };
  },
  
  async created(){
    console.log("IM thE ID");
    
    const response =await API.getTaksbyID(this.$route.params.id);
    
    this.post = response;
  },
  methods:{
    async updateTaskStatus(id) {
      const post = await API.getTaksbyID(id);
      console.log("UPDATE TAKS: ",post);
      post.status = this.task.status === "completed" ? "completed" : "uncompleted";
      await post.save();
    },
    async submitForm(){
      const formData = new FormData();
      
      formData.append('title', this.post.title);
      formData.append('status',this.post.status);
      formData.append('content', this.post.content);
      console.log("THIS IS CREATE form data : " + formData.values());
      if(this.$refs.form.validate()){
        const response = await API.addTask(formData);
        this.$router.push({name: 'about', params: {message: response.message}})
      }
    },
    async updateForm(id, title, status, content){
      const formData = new FormData();
      console.log("THIS POSTTTTTT : " + JSON.stringify(this.post));
      console.log(this.task)
      formData.append('title', title);
      formData.append('status',status);
      formData.append('content', content);
      console.log("I m HERE RN");
      
        console.log("I reached here !!!");
        console.log("JSON FORMDATA "  +JSON.stringify(formData));
        const response = await API.updateTask(id, formData);
        console.log("REACHED : " + JSON.stringify(response));
        this.$router.push({name: 'about', params: {message: response.message}})
      
      
    },
    async removePost(id){
      console.log("hELLO");
      console.log(id);
      const response = await API.deleteTask(id);
      console.log("oNCE AGAIN");

    },

  },
  async created() {
    this.tasks = await API.getAllTaks();
  },
  watch: {
  "task.status": {
    handler: "updateTaskStatus",
    immediate: false,
  },
},
}
</script>

<style>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ;
  height: 100vh;
}
.background-image {
  background-image: url('../../public/spacee-740x463.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5; /* Adjust opacity to your liking */
}
.rounded-image {
  width: 100px; /* Adjust size to your liking */
  height: 100px; /* Adjust size to your liking */
  border-radius: 50%;
  position: relative;
  text-align: center;
  margin-left: 50;

  top: 20px; /* Adjust position to your liking */
}
.content-container {
  display: flex !important;
  flex-direction: column !important;
  background-color: white;
  padding: 20px;
  margin-top: 120px; /* Adjust margin to your liking */
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* Adjust box-shadow to your liking */
  width: 100%; /* Adjust width to your liking */
  max-width: 600px; /* Adjust max-width to your liking */
  text-align: center;
}

.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.v-btn:not(.v-btn--round).v-size--default {
    height: 36px;
    min-width: 91px;
   
}

h2 {
  margin: 0;
}
.row.no-gutters {
    margin: 0;
    margin-top: 0px;
}
.v-input--selection-controls.v-input {
    flex: 0 1 auto;
    margin-right: 80px;
}


.addtodo{
  text-align: left !important;
}

.title,
.content {
  display: inline-block;
  white-space: nowrap;
 
  max-width: calc(100% - 48px);
}
</style>
