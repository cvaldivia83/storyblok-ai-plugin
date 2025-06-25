import { StoryblokComponent, useStoryblok } from '@storyblok/react';
import './App.css';



const App = () => {

  const story = useStoryblok('landing', {
    version: 'published', // or 'published'
  });

  if (!story || !story.content) {
    return <div>Loading...</div>;
  }
  return <StoryblokComponent blok={story.content} />;
}

export default App;