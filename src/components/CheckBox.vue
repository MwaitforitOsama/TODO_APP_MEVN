<template>
    <div class="checkbox-container">
      <input type="checkbox" :id="id" :checked="isChecked" @change="toggleCheck">
      <label :for="id" class="checkbox-label">
        <svg class="checkbox-icon" :class="{ 'checked': isChecked }" viewBox="0 0 24 24">
          <circle class="checkbox-background" cx="12" cy="12" r="10"></circle>
          <path class="checkbox-tick" d="M7 13.4L10.3 17L17 10"></path>
        </svg>
        <span class="checkbox-text">{{ label }}</span>
      </label>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RoundCheckbox',
    props: {
      id: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isChecked: this.value
      };
    },
    methods: {
      toggleCheck() {
        this.isChecked = !this.isChecked;
        this.$emit('input', this.isChecked);
      }
    }
  };
  </script>
  
  <style scoped>
  .checkbox-container {
    display: flex;
    align-items: center;
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    margin-left: 0.5rem;
    cursor: pointer;
  }
  
  .checkbox-icon {
    width: 1.5rem;
    height: 1.5rem;
    stroke: white;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    margin-right: 0.5rem;
    transition: all 0.2s ease-in-out;
  }
  
  .checkbox-background {
    fill: none;
    stroke: #ccc;
    stroke-width: 2;
    transition: all 0.2s ease-in-out;
  }
  
  .checkbox-tick {
    stroke-dasharray: 24;
    stroke-dashoffset: 24;
    transition: all 0.2s ease-in-out;
  }
  
  .checked .checkbox-background {
    stroke: #007aff;
  }
  
  .checked .checkbox-tick {
    stroke-dashoffset: 0;
  }
  </style>
  