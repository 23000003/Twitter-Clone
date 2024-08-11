import { useState, useContext, useRef } from 'react';
import guest from "../assets/default.png";
import { NewPost } from '../controller/PostController';
import { useCommentPost } from '../controller/CommentController';
import { useParams } from 'react-router-dom';

export default function PostComment({comments, setComments}){
    
    const [textareaRows, setTextareaRows] = useState(1);
    const [parentHeight, setParentHeight] = useState(170);
    const [textOnFocus, setOnFocus] = useState(false);
    const [newComment, setComment] = useState('');
    const [newFile, setNewFile] = useState(' '); 
    const textareaRef = useRef(null);
    const { username, postID } = useParams();

    const handleTextareaChange = (e) => {
        autoResizeTextarea(e.target);
        setComment(e.target.value);
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
            const data = await useCommentPost(newComment, newFile, username, postID)
            setComment('');
            setNewFile(' ');
            setComments([data, ...comments]);
            console.log(data);
        }catch(err){
            console.log(err);
        }
    }

    console.log(newFile)

    const autoResizeTextarea = (textarea) => {
        textarea.style.height = 'auto';
        const newHeight = textarea.scrollHeight;
    
        if(newHeight > 60){
            textarea.style.height = `${newHeight}px`;
            setTextareaRows(Math.ceil(newHeight / 80)); 
            console.log(newHeight)
            console.log(textareaRows);
        
            setParentHeight(newHeight + 85);
        }else{
            textarea.style.height = '62px'; 
            setParentHeight(170);
        }
    };

    return(
        <form className="w-full border-b" onSubmit={createAPost}>
            {textOnFocus && (<span className='ml-16 pl-2 text-sm flex text-gray-400'>Replying to <p className='ml-1 text-blue-400'>@Kenny</p></span>)}
            <div className="flex flex-col px-5" style={textOnFocus ? {} : { paddingTop: '20px' }}>
                <div className="flex flex-row items-start">
                    <div className="flex flex-row items-start w-full" >
                        <img src={guest} className="w-9 rounded-2xl" alt="Guest" />
                        <textarea
                            ref={textareaRef}
                            rows={textareaRows}
                            required
                            autoComplete="off"
                            id="newComment"
                            style={{height: "62px"}}
                            name="newComment"
                            className="block py-1 px-4 w-full text-xl text-regularText dark:text-regularTextDark bg-transparent border-0 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer overflow-hidden resize-none"
                            placeholder="Post your reply"
                            onChange={handleTextareaChange}
                            onFocus={() => setOnFocus(true)}
                            value={newComment}
                        />
                        {!textOnFocus && (<span className='bg-blue-400 px-5 py-1.5 mr-10 mt-1 rounded-2xl opacity-60 text-sm text-white font-bold cursor-default'>Reply</span> )}
                    </div>
                    {newFile !== ' ' && (<img src={newFile} alt="" />)}
                </div>
            </div>
            {textOnFocus && (
                <div className='w-10/12 ml-16 mb-2'>
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
                            <button type='submit' className='bg-blue-400 px-5 py-1.5 rounded-2xl text-sm text-white font-bold'>Reply</button>
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
}