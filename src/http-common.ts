import axios from 'axios'
import { getEnvVar } from './utils/getEnvVar'

export default axios.create({
  baseURL: 'https://gitlab.stud.idi.ntnu.no/api/v4/projects/11698',
  headers: {
    'Content-Type': 'application/json',
    'PRIVATE-TOKEN': getEnvVar('REACT_APP_GITLAB_API_KEY'),
  },
})
