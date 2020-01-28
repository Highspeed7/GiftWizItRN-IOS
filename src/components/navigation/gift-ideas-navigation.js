import { createStackNavigator } from 'react-navigation-stack';

import GiftIdeasHome from '../gift-ideas/gift-ideas-home';
import BabyShowerPage from '../gift-ideas/baby-shower-page';
import WeddingsPage from '../gift-ideas/weddings-page';
import GirlsGiftPage from '../gift-ideas/girls-gift-page';
import BoysGiftPage from '../gift-ideas/boys-gift-page';
import GentlemenGiftPage from '../gift-ideas/gentlemen-gift-page';
import LadiesGiftPage from '../gift-ideas/ladies-gift-page';
import PetsGiftPage from '../gift-ideas/pets-gift-page';

export default GiftIdeasStackNavigator = createStackNavigator(
    {
        GiftIdeasHome:{
            screen: GiftIdeasHome
        },
        BabyShowersPage: {
            screen: BabyShowerPage
        },
        WeddingsPage: {
            screen: WeddingsPage
        },
        GirlsPage: {
            screen: GirlsGiftPage
        },
        BoysPage: {
            screen: BoysGiftPage
        },
        GentlemenPage: {
            screen: GentlemenGiftPage
        },
        LadiesPage: {
            screen: LadiesGiftPage
        },
        PetsPage: {
            screen: PetsGiftPage
        }
    },
    {
        headerMode: 'none'
    }
);