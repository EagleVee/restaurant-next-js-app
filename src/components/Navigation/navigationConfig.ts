import HomeIcon from '@/assets/icons/home.svg';
import SearchIcon from '@/assets/icons/search.svg';
import MessageIcon from '@/assets/icons/message.svg';
import CalendarIcon from '@/assets/icons/calendar.svg';
import MenuIcon from '@/assets/icons/menu.svg';

export const navigationBarItems = [
    { href: '/', Icon: HomeIcon, label: '홈' },
    { href: '/search', Icon: SearchIcon, label: '검색' },
    { href: '/message', Icon: MessageIcon, label: '피드' },
    { href: '/booking', Icon: CalendarIcon, label: '내 예약' },
    { href: '/menu', Icon: MenuIcon, label: '메뉴' },
];
