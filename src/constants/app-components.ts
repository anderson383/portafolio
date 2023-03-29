import AboutMe from '@/components/features/about-me/about-me';
import Banner from '@/components/features/banner/';
import ItemExperience from '@/components/features/item-experience/item-experience';
import TabExperience from '@/components/features/tab-experience/tab-experience';

const APP_COMPONENTS = {
  'about-me': {
    component: AboutMe,
    theme: 'default'
  },
  'main-banner': {
    component: Banner,
    theme: 'default'
  },
  'tab-experience': {
    component: TabExperience,
    theme: 'default'
  },
  'text-experience': {
    component: ItemExperience,
    theme: 'default'
  }
};

export default APP_COMPONENTS;
