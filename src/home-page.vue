<template>
    <div>
      <div>
        <div style="margin-top: 2vh">
          <span style="font-weight: bold;">Websockets</span> communication
        </div>

        <div style="margin-top: 2vh; ">
          Chat with me now
        </div>
        <div style="display: flex; height: 55vh;flex-direction: column; justify-content: center; align-items: center" >
 <input class="input_name" placeholder="Name" type="text" v-model="name">
        <div class="btn_join" @click="Join">Join</div>
       
        </div>



      </div>
      <div  style="display: flex; flex-direction: column; justify-content: center; align-items: center;width: 100%; height: 10vh;position: fixed; bottom: 0px;  left: 0px; box-shadow: 1px 10px 20px ;">
        <div>
          <span style="color: red;margin-right: 1vw;">power by</span>
          <span>VueJS + Laravel (beyondcode)</span>
        </div>

      </div>
    </div>
  </template>
  
  <script>


  export default {
    name: 'Home',
    data(){
      return {
        name: "",
        private_room: true
      }
    },
    methods: {
      Join(){
        if(this.name!=""){

          const code = Math.random().toString(36).slice(2)
          this.$router.push({name: "Chat", params: {name: this.name, codigo: code }})
        }
      }
    }
  }
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .input_name{
    width: 14.5%;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, .24);
    margin-bottom: 1vh;
    border-radius: 4px;
  }
  .btn_join{
    color: white;
    border-radius: 6px;
    width: 15%;
    padding: 8px;
    font-size: 0.8em;
    background-color: rgba(63, 84, 104, 1);
  }
  </style>
  