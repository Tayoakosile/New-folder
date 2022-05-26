import { useEffect, useState } from "react"
import axios from 'axios'

const corsURL = 'https://secure-brook-81937.herokuapp.com'


const useFetchHashtags = (fetchTags) => {
    const [recentTags, setRecentTags] = useState([])

    useEffect(() => {

        const fetchTrendingHashtags = async () => {
            try {
                if (fetchTags && recentTags.length <= 0) {
                    const { data } =
                        await axios.get(`${corsURL}/https://api.ritekit.com/v1/search/trending?green=1&client_id=b631092fe151e22e86c72636d4abbe3cc48f6c7dcbe2`)
                    console.log(data, corsURL, 'data from Server')
                    setRecentTags(data.tags)

                }
            }
            catch (e) {
                console.log('error', e)
            }
        }
        // const fetc
        fetchTrendingHashtags()


    }, [fetchTags])

    return {
        recentTags
    }
}

export default
    useFetchHashtags