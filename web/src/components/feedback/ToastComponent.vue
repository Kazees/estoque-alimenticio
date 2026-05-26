<template>
    <v-snackbar
        v-model="visible"
        :color="current.color"
        :timeout="current.timeout"
        location="top"
        @update:model-value="onClose"
    >
        {{ current.text }}
    </v-snackbar>
</template>

<script>
export default {
    name: 'ToastComponent',
    data() {
        return {
            visible: false,
            current: { text: '', color: 'info', timeout: 2000 },
            queue: [],
        };
    },
    methods: {
        success(message) {
            this._enqueue({ text: message, color: 'success', timeout: 2000 });
        },
        error(message) {
            this._enqueue({ text: message, color: 'error', timeout: 2000 });
        },
        info(message) {
            this._enqueue({ text: message, color: 'info', timeout: 2000 });
        },
        _enqueue(msg) {
            this.queue.push(msg);
            if (!this.visible) this._next();
        },
        _next() {
            if (this.queue.length === 0) return;
            this.current = this.queue.shift();
            this.visible = true;
        },
        onClose(val) {
            if (!val) this._next();
        },
    },
};
</script>
