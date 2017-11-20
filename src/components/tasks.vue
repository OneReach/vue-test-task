npm <template>
    <div>
        <ui-tabs fullwidth active-tab="tab-1">
             <ui-tab v-for="tabName in tabsName"  :title="tabName.name">
                 <v-bar wrapper="wrapper">
                     <transition-group tag="ul" name="list" class="todo__tasks">

                          <li
                              v-for="(task, index) in tasks"
                              v-if="!task.complete && (tabName.name === 'Pending')"
                              :class="{complete : task.complete}"
                              :key="index"
                          >
                              <label>
                                 <ui-checkbox type="checkbox" v-model="task.complete">{{task.name}}</ui-checkbox>
                              </label>
                          </li>

                          <li
                              v-for="(task, index) in tasks"
                              v-if="task.complete && (tabName.name === 'Completed')"
                              :class="{complete : task.complete}"
                              :key="index">
                              <label >
                                 <ui-checkbox type="checkbox" v-model="task.complete">{{task.name}}</ui-checkbox>
                              </label>
                          </li>

                     </transition-group>
                 </v-bar>
             </ui-tab>
         </ui-tabs>
      </div>
</template>

<script>
   import vBar from 'v-bar';

   export default {
        components : { vBar },
        props: ['tasks', 'tabsName'],

    };
</script>

<style scoped lang="scss">
    .wrapper {
        width: 100%;
        height: 300px;
        position: relative;
        overflow: visible;
    }
    .todo {
        &__tasks {
            list-style: none;
            padding: 0;
            &-add-field {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                .ui-textbox {
                    flex-basis: 100%;
                }
                .ui-button {
                    border-radius: 25px;
                }
            }
        }
        .complete {
            text-decoration: line-through;
        }
        .list {
            &-move,
            &-enter,
            &-leave-active,
            &-enter-active {
                transition: all 500ms cubic-bezier(.87,-.41,.19,1.44);

            }
            &-leave-active {
                transform: translate(100%, -50px);
                text-decoration: line-through;
                opacity: 0;
            }
            &-enter,
            &-enter-active {
                transform: translate(0, 50px);
            }
        }
    }
</style>
