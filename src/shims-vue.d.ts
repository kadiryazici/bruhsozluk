declare module '*.vue' {
   // import { ComponentOptions } from 'vue'
   // const component: ComponentOptions
   // export default component
   import { defineComponent } from 'vue';
   const Component: ReturnType<typeof defineComponent>;
   export default Component;
}
