<script lang="ts">
    import type { IRestaurant } from "../types/Restaurant";


export let restaurant: IRestaurant
export let onClick: () => void

</script>

<p class="list-item" on:click={onClick}>
    {restaurant.name}
</p>

<style lang="scss">
.list-item {
    height: fit-content;
    margin-top: 2px;
}
</style>