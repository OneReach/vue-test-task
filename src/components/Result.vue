<template>
	<div class="result">
		<h1 class="title">To Do</h1>
		<div class="result__box">
			<!-- tabs -->
			<div class="result__tabs">
				<button
					v-for="(tab, index) in tabs"
					:key="index"
					class="result__tab"
					:class="{'is-active': activeTab === tab}"
					@click="activeTab = tab"
				>
					{{ tab }}
				</button>
			</div>
			<div class="result__tabs-container">
				<!-- pending items tab -->
				<ul v-if="activeTab === 'Pending'">

					<transition-group name="list">
						<li 
							class="result__list-item"
							v-for="(item, index) in pendingItems"
							:key="index"
						>
							<ui-checkbox
								:value="item.checked"
								@focus="deleteItem(item, index)"
							>{{item.name}}</ui-checkbox>
						</li>
					</transition-group>

				</ul>
				<!-- completed items tab -->
				<ul v-if="activeTab === 'Completed'">
					<li 
						class="result__list-item result__list-item_done"
						v-for="(item, index) in completedItems"
						:key="index"
					>
						<ui-checkbox
							:value="item.checked"
						>
							{{item.name}}
						</ui-checkbox>
					</li>
				</ul>

			</div>
		</div>
		<!-- textfield & btn -->
		<form @submit.prevent="addItem" class="result__footer">
			 <ui-textbox
			 	class="result__input-text"
                placeholder="Enter your task"
                v-model="newToDoItem"
            ></ui-textbox>

			<ui-button 
				color="primary" 
				class="result__addbtn"
			>
				Add item
			</ui-button>
		</form>
	</div>
</template>
<script>
export default {
	data() {
		return {
			tabs: ['Pending', 'Completed'], 
			activeTab: 'Pending',
			newToDoItem: '', //binded with input via v-model
			pendingItems: [],
			completedItems: []
		}
	},
	methods: {
		addItem() {
			if(this.newToDoItem) {
				this.pendingItems.push({name: this.newToDoItem, checked: false});
				this.newToDoItem = ''; //reset input field
				this.updateLocalStorage();
			}
		},
		deleteItem(item, index) {
			console.log('focues');
			//set checkbox to true (item completed)
			this.pendingItems[index].checked = true;
			// add item to completed
			this.completedItems.unshift(item);
			//remove item from pending
			this.pendingItems.splice(index,1);
			this.updateLocalStorage();
		},
		updateLocalStorage() {
			localStorage.setItem('pendingItems', JSON.stringify(this.pendingItems))
			localStorage.setItem('completedItems', JSON.stringify(this.completedItems))
		},
		getDataFromLocalStorage() {
			const completedItems = localStorage.getItem('completedItems');
			const pendingItems = localStorage.getItem('pendingItems');
			if(completedItems) {
				this.completedItems = JSON.parse(completedItems)
			}
			if(pendingItems) {
				this.pendingItems = JSON.parse(pendingItems)
			}
		}
	},
	mounted() {
		this.getDataFromLocalStorage();
	}
}
</script>
<style lang="scss">
	.result {
		margin: auto;
		padding: 30px 20px;
		width: 500px;
		max-width: 500px;
		height: 500px;
		max-height: 500px;
		background: white;
		display: flex;
		flex-direction: column;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;
		&__tabs {
			margin: 20px 0;
		}
		&__tabs-container {
			padding: 20px 10px;
			overflow-y: overlay;
			max-height: 240px;
		}
		&__tab {
			display: inline-block;
			margin-right: 15px;
			font-size: 18px;
			color: lightgray;
			padding: 5px 10px;
			border-radius: 15px;
		}
		&__tab.is-active {
			background: lightgray;
			color: white;
		}
		&__addbtn {
			border-radius: 20px !important;
		}
		&__input-text {
			width: 70%;
			margin-bottom: 0 !important;
		}
		&__footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: auto;
		}
		&__list-item {
			margin-bottom: 10px;
			position: relative;
			&:after {
				display: inline-block;
				content: '';
				position: absolute;
				top: 50%;
				width: 0;
				height: 2px;
				margin-top: -1px;
				background: black;
			}
			&_done {
				&:after {
					width: 100%;
				}
			}
		}
		&__list-item:last-of-type {
			margin-bottom: 0;
		}
		//animation classes for list transition
		.list-enter-active{
			transition: all .5s;
		}
		.list-enter{
			opacity: 0;
			transform: translateY(20px);
		}
	}
</style>