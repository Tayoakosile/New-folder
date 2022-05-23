import axios from "axios";
import { useState } from "react"

const corsURL = 'https://secure-brook-81937.herokuapp.com'
const useGenerateNewHashTag = () => {
    const [generatedTags, setGeneratedNewTag] = useState([])
    const [isAutoGeneratingLoading, setIsAutoGeneratingLoading] = useState(false)

    const generateNewTag = async (text) => {
        setIsAutoGeneratingLoading(true)
        try {

            const autoGeneratingText = text.replace(/ /g, "%20");
            console.log(autoGeneratingText, 'text')

            
            const { data } = await axios.get(`${corsURL
                }/https://api.ritekit.com/v1/stats/hashtag-suggestions?text=${autoGeneratingText}&client_id=b631092fe151e22e86c72636d4abbe3cc48f6c7dcbe2`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Access-Control-Allow-Origin": '*'
                }
            })

            setGeneratedNewTag(data.data)
            console.log({ data }, 'datadata')
            setIsAutoGeneratingLoading(false)

        }
        catch (e) {
            setIsAutoGeneratingLoading(false)
            console.log('e', e)
        }
    }

    return {
        generateNewTag,
        generatedTags,
        isAutoGeneratingLoading
    }
}

export default useGenerateNewHashTag