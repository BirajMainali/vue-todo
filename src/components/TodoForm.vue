<script setup>
import { ref, defineEmits } from "vue";

const label = ref("");

const emit = defineEmits(["todo-added"]);

const LoadIntial = () => {
  label.value = "";
};

const onAdd = () => {
  if (!label.value) return;
  emit("todo-added", label.value);
  LoadIntial();
};
</script>

<template>
  <div class="card mb-2">
    <div class="card-header bg-success">
      <div class="card-header-title text-white">Add Todo</div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-4">
          <div class="form-group">
            <label>What need to be done. Hmmm ?</label>
            <input
              type="text"
              v-model="label"
              ref="todolabelRef"
              class="form-control"
              v-on:keyup.enter.prevent="onAdd"
            />
          </div>
        </div>
        <div class="col">
          <br />
          <button type="button" class="btn btn-success" @click="onAdd">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
