<script setup>
const props = defineProps({
	fields: Array,
	isLoading: Boolean,
	buttonText: String,
})
const emit = defineEmits(['submit'])

const formData = ref({})

props.fields.forEach(field => {
	formData.value[field.id] = ''
})

const handleSubmit = () => {
	emit('submit', formData.value)
}
</script>

<template>
	<form class="m-auth-form-fields" @submit.prevent="handleSubmit">
		<AAuthFormField
			v-for="field in fields"
			:key="field.id"
			:id="field.id"
			:type="field.type"
			:placeholder="field.placeholder"
			:label="field.label"
			v-model="formData[field.id]"
		/>
		<AAuthFormButton :isLoading="isLoading">
			{{ isLoading ? 'Загрузка...' : buttonText }}
		</AAuthFormButton>
	</form>
</template>

<style src="./MAuthFormFields.scss" lang="scss" scoped />
