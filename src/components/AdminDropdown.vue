<template>
    <div>
        <b-dropdown
            variant='primary'
            text="Go to"
            block
            class="m-2"
            menu-class="w-100"
        >
            <b-dropdown-item :to="{ path: '/admin' }">Approve experiences</b-dropdown-item>
            <b-dropdown-item :to="{ path: '/adminApproved' }">View approved experiences</b-dropdown-item>
            <b-dropdown-item :to="{ path: '/manageSlider' }">Manage slider</b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
    export default {
        name: 'adminDropdown',
    }
</script>