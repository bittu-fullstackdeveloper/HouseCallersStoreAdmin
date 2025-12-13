const KEY_JOBS = 'mock_jobs_v1'
const KEY_BLOGS = 'mock_blogs_v1'

export const getJobs = () => {
  const raw = localStorage.getItem(KEY_JOBS)
  if (!raw) {
    const seed = [
      { id: '1', title: 'Frontend Developer', experience: '1-3 years', status: 'open', location: 'Remote' },
      { id: '2', title: 'Backend Developer', experience: '2-4 years', status: 'closed', location: 'Onsite' }
    ]
    localStorage.setItem(KEY_JOBS, JSON.stringify(seed))
    return seed
  }
  return JSON.parse(raw)
}

export const saveJobs = (products) => {
  localStorage.setItem(KEY_JOBS, JSON.stringify(products))
}

export const getBlogs = () => {
  const raw = localStorage.getItem(KEY_BLOGS)
  if (!raw) {
    const seed = [
      { id: 'b1', title: 'Welcome to our Blog', slug: 'welcome', status: 'published', excerpt: 'Intro post' }
    ]
    localStorage.setItem(KEY_BLOGS, JSON.stringify(seed))
    return seed
  }
  return JSON.parse(raw)
}

export const saveBlogs = (blogs) => {
  localStorage.setItem(KEY_BLOGS, JSON.stringify(blogs))
}

