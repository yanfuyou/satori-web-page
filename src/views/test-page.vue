<template>
    <div>
        <form action="http://localhost:8080/satori-service-api/api/system/file/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="file" />
            <input type="submit" value="Upload" />
        </form>
    </div>
</template>

<script setup>

</script>