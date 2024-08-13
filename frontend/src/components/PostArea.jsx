import { useState, useContext, useRef } from 'react';
import guest from "../assets/default.png";
import { NewPost } from '../controller/PostController';
import { PostContext } from '../contexts/PostContext';
import { UserContext } from '../contexts/UserContext';

export default function PostInputTextarea() {
    const [textareaRows, setTextareaRows] = useState(1);
    const [parentHeight, setParentHeight] = useState(170);
    const [newPost, setNewPost] = useState('');
    const [newFile, setNewFile] = useState(' '); //default value for the db if theres no image from the post
    const { post, setPost, loading } = useContext(PostContext);
    const { user } = useContext(UserContext);
    const textareaRef = useRef(null);

    // Function to handle textarea changes
    const handleTextareaChange = (e) => {
        autoResizeTextarea(e.target);
        setNewPost(e.target.value);
    };

    const readFileImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewFile(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const createAPost = async(e) =>{
        e.preventDefault();

        try{
            const data = await NewPost(newPost, newFile)
            setNewPost('');
            setNewFile(' ');
            setPost([data.data[0], ...post]); // to put it in the first index :) reverse its order if at the last
            console.log(data);
        }catch(err){
            console.log(err);
        }
    }

    console.log(post)

    const autoResizeTextarea = (textarea) => {
        textarea.style.height = 'auto'; 
        const newHeight = textarea.scrollHeight;

        if(newHeight > 92){
            textarea.style.height = `${newHeight}px`;
            setTextareaRows(Math.ceil(newHeight / 80)); 
            console.log(newHeight)
            console.log(textareaRows);
        
            setParentHeight(newHeight + 85);

        }else{
            textarea.style.height = '92px'; 
            setParentHeight(170)
        }
    };


    return (
        <form className="w-full border-b" onSubmit={createAPost}>
            <div className="flex flex-col px-5 pt-5">
                <div className="flex flex-row items-start">
                    <div className="flex flex-row items-start w-full" >
                        <img src={user.profile} className="w-9 rounded-3xl" alt="Guest" />
                        <textarea
                            ref={textareaRef}
                            rows={textareaRows}
                            required
                            autoComplete="off"
                            id="newPost"
                            style={{height: "92px"}}
                            name="newPost"
                            className="block py-1 px-4 w-full text-xl text-regularText dark:text-regularTextDark bg-transparent border-0 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer overflow-hidden resize-none"
                            placeholder="What is happening?!"
                            onChange={handleTextareaChange}
                            value={newPost}
                        />
                        
                    </div>
                    {newFile !== ' ' && (<img src={newFile} alt="" />)}
                </div>
            </div>
            <div className='w-10/12 ml-16 border-t mb-2'>
                <div className='flex flex-row items-center justify-between mt-2'>
                    <div className='p-2 pl-4 flex flex-row'>
                        <label htmlFor="imageF" className='cursor-pointer'>
                            <input type="file" name="image" id="imageF" className='hidden' onChange={(e) => readFileImage(e)}/>
                            <i className="fa-regular fa-image text-blue-400"></i>
                        </label>
                        <div className='ml-4'>
                            <i className="fa-solid fa-clone text-blue-400"></i>
                        </div>
                        <div className='ml-4'>
                            <i className="fa-regular fa-face-smile text-blue-400"></i>
                        </div>
                    </div>
                    <div className='mr-6'>
                        <button type='submit' className='bg-blue-400 px-5 py-1.5 rounded-2xl text-sm text-white font-bold'>Post</button>
                    </div>
                </div>
            </div>
        </form>
    );
}
