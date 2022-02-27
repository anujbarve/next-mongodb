import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const NewNote = () => {
    const [form, setForm] = useState({ title: '', description: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createNote();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const createNote = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/notes', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let err = {};

        if (!form.title) {
            err.title = 'Title is required';
        }
        if (!form.description) {
            err.description = 'Description is required';
        }

        return err;
    }

    return (
        <div className="form-container">
            <h1>Create Note</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                label='Title'
                                placeholder='Title'
                                name='title'
                                onChange={handleChange}
                            />
                            <Form.TextArea
                                fluid
                                label='Description'
                                placeholder='Description'
                                name='description'
                                error={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                            <Form.TextArea
                                fluid
                                label='video_Number'
                                placeholder='video_number'
                                name='video_number'
                                error={errors.video_number ? { content: 'Please enter a description', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                                                        <Form.TextArea
                                fluid
                                label='instructor_name'
                                placeholder='instructor_name'
                                name='instructor_name'
                                error={errors.instructor_name ? { content: 'Please enter a description', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                                                                                    <Form.TextArea
                                fluid
                                label='instructor_pfp'
                                placeholder='instructor_pfp'
                                name='instructor_pfp'
                                error={errors.instructor_pfp ? { content: 'Please enter a description', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                                                                                    <Form.TextArea
                                fluid
                                label='video_link'
                                placeholder='video_link'
                                name='video_link'
                                error={errors.video_link ? { content: 'Please enter a description', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                                                                                                                <Form.TextArea
                                fluid
                                label='category'
                                placeholder='category'
                                name='category'
                                error={errors.category ? { content: 'Please enter a description', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                            
                            <Form.TextArea
                                fluid
                                label='previous_les'
                                placeholder='previous_les'
                                name='previous_les'
                                error={errors.previous_les ? { content: 'Please enter a description', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                                                        <Form.TextArea
                                fluid
                                label='next_les'
                                placeholder='next_les'
                                name='next_les'
                                error={errors.previous_les ? { content: 'Please enter a description', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                            
                            <Button type='submit'>Create</Button>
                        </Form>
                }
            </div>
        </div>
    )
}

export default NewNote;