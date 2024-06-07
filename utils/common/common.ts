import { COMPLETED_IMAGES } from '@/constants';

// Define the getRandomCompleteImage function
export function getRandomCompletedImage(): string {
  // Generate a random index within the range of the images array
  const randomIndex = Math.floor(Math.random() * COMPLETED_IMAGES.length);

  // Return the randomly selected image
  return COMPLETED_IMAGES[randomIndex];
}
