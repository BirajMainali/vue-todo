<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
    default: "",
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: "",
  },
});
</script>

<template>
  <ul class="list-group mb-1">
    <li class="list-group-item">{{ props.label }}</li>
  </ul>
</template>
