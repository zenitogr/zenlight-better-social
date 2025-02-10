import Image from 'next/image';
import { IMAGES } from '@/constants/images';

// Replace img with Next.js Image component
<Image 
  {...IMAGES.defaultAvatar}
  className={/* your existing className */}
/> 