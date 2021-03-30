<script lang="ts" setup>
ref: liked = false;
</script>

<template>
   <div class="entry-wrapper">
      <div class="entry-body">
         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
         assumenda illo asperiores iusto aliquam quam vitae molestias eius!
         Veritatis ullam debitis ratione id non voluptas exercitationem
         excepturi magnam molestiae natus laborum odio eius voluptate ex
         corporis sit doloremque impedit illum, optio corrupti vero itaque
         expedita dolorem assumenda. Nemo, alias adipisci!
         <br />
         <br />
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
         quasi! Debitis accusantium esse voluptatibus velit, quidem quia
         doloribus, nemo deleniti perferendis, temporibus quisquam reprehenderit
         laborum aperiam aliquam odit inventore. Vel magni quis blanditiis
         fugiat eum maxime, est ab a quod adipisci corrupti fugit at dolor
         corporis odio aut. Repellat, nostrum!
         <br />
         <br />
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
         mollitia eveniet ad quisquam aperiam nesciunt facere consequuntur rerum
         unde aliquid deleniti non quaerat, qui vero cumque debitis facilis
         eligendi laudantium. Corrupti consectetur magnam aliquam veritatis quam
         tenetur delectus debitis tempore cupiditate asperiores? Ipsa, ipsam a
         quaerat numquam tenetur dignissimos pariatur!
      </div>
      <div class="entry-footer">
         <div class="entry-info">
            <span class="writer">kadiryazici</span>
            <span role="time" class="date">// 24.13.2015</span>
         </div>
         <div class="icon-section">
            <Icon
               role="button"
               aria-label="beğen"
               title="beğen"
               class="button heart-icon"
               @click="liked = !liked"
               :name="liked ? 'favorite' : 'favorite_border'"
            />
            <span class="count">215</span>
            <Icon
               aria-label="sil"
               title="sil"
               role="button"
               class="button delete-icon"
               name="delete"
            />
         </div>
      </div>
   </div>
</template>

<style lang="scss" scoped>
.entry-wrapper {
   display: block;
   width: 100%;
   padding: funcs.padding(2);
   background-color: colors.$coal;
   border-radius: vars.$radius;

   .entry-body {
      background-color: colors.$primary;
      padding: funcs.padding(2);
      border-radius: vars.$radius vars.$radius 0 0;
      color: colors.$secondary;
      margin-bottom: funcs.padding(2);
      font-size: vars.$entryBodyFontSize;
      box-shadow: vars.$shadowDarkDown;
   }

   .entry-footer {
      // display: flex;
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      background-color: colors.$primary;
      padding: funcs.padding(2);
      border-radius: 0 0 vars.$radius vars.$radius;
      align-items: center;
      // color: colors.$secondary;
      // margin-bottom: funcs.padding(2);
      font-size: vars.$entryFooterFontSize;
      box-shadow: vars.$shadowDarkDown;

      .entry-info {
         margin-right: funcs.padding(2);
         .writer {
            margin-right: funcs.padding(1);
            color: colors.$turq;
            // flex: 1;
         }

         .date {
            color: colors.$coal;
            // flex: 1;
         }
      }

      .icon-section {
         width: 100%;
         flex-basis: 0;
         flex-grow: 1;
         height: 20px;
         align-items: center;
         display: flex;
         .heart-icon {
            font-size: 20px;
            color: colors.$ruby;
            margin-right: funcs.padding(1);
         }
         .count {
            color: colors.$ruby;
         }
         .delete-icon {
            margin-left: auto;
            color: colors.$secondary;
         }
      }
   }
}
</style>
