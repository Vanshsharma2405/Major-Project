/**
 * Shared product data for use across the website
 * This file contains product information used in index.html, men.html, and women.html
 */

// Export the products array for use in other files
export const sharedProducts = [
  {
    id: 'p1',
    name: 'Nike Cortez Leather',
    gender: 'Women\'s shoe',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/236a53ed-106f-44bb-855d-05abab45f414/W+NIKE+CORTEZ.png',
    originalPrice: 11868,
    currentPrice: 11868,
    discount: 0,
    description: 'The Nike Cortez Leather brings back the running shoe that helped start it all. Featuring the same design that took the sneaker world by storm, it delivers a premium look with a leather upper and heritage styling.'
  },
  {
    id: 'p2',
    name: 'Nike Dunk Low Retro',
    gender: 'Men\'s shoe',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/dbd2620b-a99f-4279-97db-0344edf84e31/NIKE+DUNK+LOW+RETRO.png',
    originalPrice: 14088,
    currentPrice: 14088,
    discount: 0,
    description: 'The Nike Dunk Low Retro returns with crisp overlays and original team colors. This basketball icon channels \'80s vibes with a padded, low-cut collar that looks good while feeling great.'
  },
  {
    id: 'p3',
    name: 'Nike Cortez',
    gender: 'Women\'s shoe',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c7ef8fe0-cdbd-4033-b613-debf06a95aa7/W+NIKE+CORTEZ.png',
    originalPrice: 12381,
    currentPrice: 12381,
    discount: 0,
    description: 'The Nike Cortez is the original StepStyle track shoe, designed by Bill Bowerman and released in 1972. This version features a premium leather upper for a clean, classic look and durable comfort.'
  },
  {
    id: 'p4',
    name: 'Sabrina 2 \'Stronger Than Gold\' EP',
    gender: 'Basketball shoe',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png',
    originalPrice: 18699,
    currentPrice: 18699,
    discount: 0,
    description: 'The Sabrina 2 \'Stronger Than Gold\' EP is built for speed and agility on the court. Featuring responsive cushioning and multidirectional traction, these shoes help you make quick cuts and explosive moves.'
  },
  {
    id: 'p5',
    name: 'Sabrina 2 EP',
    gender: 'Basketball shoe',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fec1fda4-a17b-43ad-8e8d-be1c732bc522/SABRINA+2+EP.png',
    originalPrice: 11895,
    currentPrice: 11895,
    discount: 0,
    description: 'The Sabrina 2 EP basketball shoes deliver the perfect blend of court feel and energy return. The lightweight design and responsive cushioning help you stay quick and comfortable throughout the game.'
  },
  // Add the existing products from men.js
  {
    id: 'p6',
    name: 'StepStyle AirFlex Pro',
    gender: 'Men\'s shoe',
    image: '/assets/images/stepstyle-air-flex-pro.png',
    originalPrice: 12995,
    currentPrice: 9995,
    discount: 23,
    description: 'The StepStyle AirFlex Pro features revolutionary cushioning technology for maximum comfort. Perfect for both athletic performance and casual wear, these shoes are designed to keep you comfortable all day long.'
  },
  {
    id: 'p7',
    name: 'StepStyle RetroFlex Vintage',
    gender: 'Men\'s shoe',
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1000&auto=format&fit=crop',
    originalPrice: 9995,
    currentPrice: 7495,
    discount: 25,
    description: 'The StepStyle RetroFlex Vintage brings classic design into the modern era. Inspired by retro aesthetics but built with contemporary comfort technology for the best of both worlds.'
  },
  {
    id: 'p8',
    name: 'Nike Air Max 270',
    gender: 'Men\'s shoe',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/awjogtdnqxniqqk0wpgf/air-max-270-shoes-2V5C4p.png',
    originalPrice: 13995,
    currentPrice: 11995,
    discount: 14,
    description: 'Nike\'s first lifestyle Air Max brings you style, comfort and big attitude in the Nike Air Max 270. The design draws inspiration from Air Max icons, showcasing Nike\'s greatest innovation with its large window and fresh array of colors.'
  },
  {
    id: 'p9',
    name: 'Nike Air Force 1 \'07',
    gender: 'Men\'s shoe',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WrLlWX.png',
    originalPrice: 9695,
    currentPrice: 9695,
    discount: 0,
    description: 'The radiance lives on in the Nike Air Force 1 \'07, the basketball original that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.'
  },
  {
    id: 'p10',
    name: 'Nike Air Max 2013',
    gender: 'Men\'s shoe',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0ad46216-8ad9-46ba-85e8-040c51913e77/AIR+MAX+2013.png',
    originalPrice: 12795,
    currentPrice: 10236,
    discount: 20,
    description: 'A springy ride for any run, the Peg\'s familiar, just-for-you feel returns to help you accomplish your goals. This version has the same responsiveness and neutral support you love but with improved comfort in those sensitive areas of your foot.'
  },
  {
    id: 'p11',
    name: 'Nike Reax 8 TR',
    gender: 'Men\'s shoe',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b0b6ad82-d6cd-451c-a20b-21ccd986caea/NIKE+REAX+8+TR+MESH.png',
    originalPrice: 13995,
    currentPrice: 13995,
    discount: 0,
    description: 'When your workout demands more from you, demand more from your shoes. The Metcon 9 AMP helps you lift, climb, run, jump and push through your toughest training sessions with stability and durability.'
  },
  {
    id: 'p12',
    name: 'Nike Dunk Low SE',
    gender: 'Men\'s shoe',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7f9d51b3-b45d-4083-a633-5cc68ecf789b/NIKE+DUNK+LOW+SE.png',
    originalPrice: 11895,
    currentPrice: 12796,
    discount: 20,
    description: 'Bridge the gap between your weekend training run and race day in a shoe that helps you feel fast. The Zoom Fly 5 gives you a supportive fit and a responsive ride for comfort during long runs.'
  },
  {
    id: 'p13',
    name: 'NOCTA Air Force 1',
    gender: 'Men\'s shoe',
    image: 'https://static.nike.com/a/images/w_1280,q_auto,f_auto/53e5c878-5bf2-4f9a-bd6e-13ee1b3c0588/nocta-air-force-1-white-cz8065-100-release-date.jpg',
    originalPrice: 20795,
    currentPrice: 20795,
    discount: 0,
    description: 'Continue the next evolution of speed with a racing shoe made to help you chase new goals and records. The Nike Vaporfly 3 is designed to help deliver speed for race day with comfortable support.'
  },
  {
    id: 'p14',
    name: 'Nike Pegasus Plus',
    gender: 'Men\'s shoe',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/97565f94-62bc-4409-b529-f7f9e0a44a7b/PEGASUS+PLUS.png',
    originalPrice: 16995,
    currentPrice: 13596,
    discount: 20,
    description: 'With maximum cushioning to support every mile, the Invincible 3 gives you our highest level of comfort underfoot to help you stay on your feet today, tomorrow and beyond.'
  },
  {
    id: 'p15',
    name: 'Nike Blazer Mid \'77 Vintage',
    gender: 'Men\'s shoe',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fb7eda3c-5ac8-4d05-a18f-1c2c5e82e36e/blazer-mid-77-vintage-shoes-CBDjT0.png',
    originalPrice: 9695,
    currentPrice: 9695,
    discount: 0,
    description: 'In the \'70s, Nike was the new shoe on the block. So new in fact, we were still breaking into the basketball scene and testing prototypes on the feet of our local team. Of course, the design improved over the years, but the name stuck.'
  },
  {
    id: 'p16',
    name: 'React Presto Psychedelic Lava',
    gender: 'Men\'s shoe',
    image: 'https://static.nike.com/a/images/w_1280,q_auto,f_auto/z4ooslzocdtj9wqdmw3d/react-presto-psychedelic-lava-release-date.jpg',
    originalPrice: 16995,
    currentPrice: 16995,
    discount: 0,
    description: 'Let your attitude have the edge in your Nike Air Max Plus, a Tuned Air experience that offers premium stability and unbelievable cushioning. Featuring the original wavy design lines, TPU accents and airy mesh, it celebrates defiant style.'
  },
  // Women's products
  {
    id: 'w1',
    name: 'StepStyle AirGlide Elite',
    gender: 'Women\'s shoe',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/236a53ed-106f-44bb-855d-05abab45f414/W+NIKE+CORTEZ.png',
    originalPrice: 11868,
    currentPrice: 9495,
    discount: 20,
    description: 'The StepStyle AirGlide Elite features revolutionary cushioning technology for maximum comfort. Perfect for both athletic performance and casual wear, these shoes are designed to keep you comfortable all day long.',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/236a53ed-106f-44bb-855d-05abab45f414/W+NIKE+CORTEZ.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c7ef8fe0-cdbd-4033-b613-debf06a95aa7/W+NIKE+CORTEZ.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fec1fda4-a17b-43ad-8e8d-be1c732bc522/SABRINA+2+EP.png'
    ]
  },
  {
    id: 'w2',
    name: 'StepStyle Cloud Runner',
    gender: 'Women\'s shoe',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c7ef8fe0-cdbd-4033-b613-debf06a95aa7/W+NIKE+CORTEZ.png',
    originalPrice: 9995,
    currentPrice: 7995,
    discount: 20,
    description: 'Experience cloud-like comfort with the StepStyle Cloud Runner. These lightweight running shoes feature responsive cushioning and breathable mesh upper, making them perfect for your daily runs or casual wear.',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c7ef8fe0-cdbd-4033-b613-debf06a95aa7/W+NIKE+CORTEZ.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/236a53ed-106f-44bb-855d-05abab45f414/W+NIKE+CORTEZ.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fec1fda4-a17b-43ad-8e8d-be1c732bc522/SABRINA+2+EP.png'
    ]
  },
  {
    id: 'w3',
    name: 'StepStyle Flex Motion',
    gender: 'Women\'s shoe',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png',
    originalPrice: 8495,
    currentPrice: 6795,
    discount: 20,
    description: 'The StepStyle Flex Motion is designed for natural movement and flexibility. With a lightweight construction and flexible sole, these shoes adapt to your foot\'s natural motion, providing comfort and support for any activity.',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/236a53ed-106f-44bb-855d-05abab45f414/W+NIKE+CORTEZ.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c7ef8fe0-cdbd-4033-b613-debf06a95aa7/W+NIKE+CORTEZ.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fec1fda4-a17b-43ad-8e8d-be1c732bc522/SABRINA+2+EP.png'
    ]
  },
  {
    id: 'w4',
    name: 'StepStyle Urban Chic',
    gender: 'Women\'s shoe',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fec1fda4-a17b-43ad-8e8d-be1c732bc522/SABRINA+2+EP.png',
    originalPrice: 10995,
    currentPrice: 8795,
    discount: 20,
    description: 'Elevate your street style with the StepStyle Urban Chic. These fashion-forward shoes combine trendy design with all-day comfort, making them the perfect addition to your casual wardrobe.',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fec1fda4-a17b-43ad-8e8d-be1c732bc522/SABRINA+2+EP.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/236a53ed-106f-44bb-855d-05abab45f414/W+NIKE+CORTEZ.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c7ef8fe0-cdbd-4033-b613-debf06a95aa7/W+NIKE+CORTEZ.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png'
    ]
  },
  {
    id: 'w5',
    name: 'StepStyle Breeze Walk',
    gender: 'Women\'s shoe',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/dbd2620b-a99f-4279-97db-0344edf84e31/NIKE+DUNK+LOW+RETRO.png',
    originalPrice: 7995,
    currentPrice: 6395,
    discount: 20,
    description: 'Experience ultimate breathability with the StepStyle Breeze Walk. Featuring a lightweight mesh upper and cushioned sole, these shoes keep your feet cool and comfortable all day long.',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/dbd2620b-a99f-4279-97db-0344edf84e31/NIKE+DUNK+LOW+RETRO.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/236a53ed-106f-44bb-855d-05abab45f414/W+NIKE+CORTEZ.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c7ef8fe0-cdbd-4033-b613-debf06a95aa7/W+NIKE+CORTEZ.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png'
    ]
  },
  {
    id: 'w6',
    name: 'StepStyle Elegance Pro',
    gender: 'Women\'s shoe',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/236a53ed-106f-44bb-855d-05abab45f414/W+NIKE+CORTEZ.png',
    originalPrice: 12995,
    currentPrice: 9995,
    discount: 23,
    description: 'The StepStyle Elegance Pro combines sophisticated style with athletic performance. These premium shoes feature luxurious materials and advanced cushioning technology for a truly elevated experience.',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/236a53ed-106f-44bb-855d-05abab45f414/W+NIKE+CORTEZ.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c7ef8fe0-cdbd-4033-b613-debf06a95aa7/W+NIKE+CORTEZ.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c930f60-8219-41f1-9b08-52b65062f9c5/SABRINA+2++NRG+EP.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fec1fda4-a17b-43ad-8e8d-be1c732bc522/SABRINA+2+EP.png'
    ]
  },
  // Kids products
  {
    id: 'k1',
    name: 'StepStyle Rainbow Runner',
    gender: 'Kids\' shoe',
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    originalPrice: 4295,
    currentPrice: 3495,
    discount: 18,
    description: 'Colorful rainbow design that kids absolutely love! These comfortable shoes bring a splash of color to every outfit and are perfect for active play.',
    images: [
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'k2',
    name: 'StepStyle Light-Up Adventurer',
    gender: 'Kids\' shoe',
    image: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    originalPrice: 4995,
    currentPrice: 4195,
    discount: 16,
    description: 'LED lights make every step magical! These shoes light up with each step, bringing joy and excitement to your child\'s day.',
    images: [
      'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'k3',
    name: 'StepStyle Bounce Master',
    gender: 'Kids\' shoe',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    originalPrice: 4595,
    currentPrice: 3795,
    discount: 17,
    description: 'Extra bouncy soles make walking and running more fun! These playful shoes have extra cushioning for happy jumps and active play.',
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'k4',
    name: 'StepStyle Dino Stomper',
    gender: 'Kids\' shoe',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    originalPrice: 4695,
    currentPrice: 3895,
    discount: 17,
    description: 'Dinosaur-themed shoes with roaring fun! These sturdy shoes make stomping sounds and have dinosaur details that kids adore.',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'k5',
    name: 'StepStyle Sparkle Step',
    gender: 'Kids\' shoe',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    originalPrice: 4395,
    currentPrice: 3695,
    discount: 16,
    description: 'Glittery shoes that sparkle with every step! These fashionable shoes add a touch of magic to any outfit and are perfect for special occasions.',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'k6',
    name: 'StepStyle Super Sport',
    gender: 'Kids\' shoe',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    originalPrice: 4795,
    currentPrice: 3995,
    discount: 17,
    description: 'Designed for young athletes in training! These durable sports shoes provide excellent support and traction for all kinds of physical activities.',
    images: [
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ]
  }
];

/**
 * Helper function to find a product by ID
 * @param {string} id - The product ID to search for
 * @returns {object|null} - The product object or null if not found
 */
export function findProductById(id) {
  return sharedProducts.find(product => product.id === id) || null;
}
