
import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import PrimeIcons from 'primevue/config';
import App from './App.vue'
import router from "@/router/index.js";
import Ripple from "primevue/ripple";
import 'primevue/resources/themes/aura-light-green/theme.css'
import "primeflex/primeflex.css";
import StyleClass from "primevue/styleclass";
import "primevue/resources/primevue.min.css";
import 'primeicons/primeicons.css';

//core

import Button from "primevue/button"
import Sidebar from 'primevue/sidebar';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Chip from 'primevue/chip';
import Listbox from 'primevue/listbox';
import InputText from 'primevue/inputtext';
import Chart from 'primevue/chart';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Toast from 'primevue/toast';
import ToastService from "primevue/toastservice";
import Tag from 'primevue/tag';
import Image from 'primevue/image';
import InputNumber from 'primevue/inputnumber';
import InputSwitch from 'primevue/inputswitch';
import RadioButton from 'primevue/radiobutton';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import FloatLabel from 'primevue/floatlabel';
















//icons
const app = createApp(App);
app.use(PrimeVue, { ripple: true }).use(router).use(PrimeIcons).use(ToastService);
app.component('Button', Button);
app.component('Sidebar', Sidebar);
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);
app.component('Chip', Chip);
app.component('Listbox', Listbox);
app.component('InputText', InputText);
app.component('Chart', Chart);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('Splitter', Splitter);
app.component('SplitterPanel', SplitterPanel);
app.component('Toast', Toast);
app.component('Tag', Tag);
app.component('Image', Image);
app.component('InputNumber', InputNumber);
app.component('InputSwitch', InputSwitch);
app.component('RadioButton', RadioButton);
app.component('Checkbox', Checkbox);
app.component('Calendar', Calendar);
app.component('Dropdown', Dropdown);
app.component('FloatLabel', FloatLabel);
app.directive('ripple', Ripple);
app.directive('styleclass', StyleClass);
app.mount('#app')
