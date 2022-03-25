/** @jest-environment jsdom */

const fs = require('fs');
const path = require('path');
const { isTypedArray } = require('util/types');
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');


describe('index.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    describe('head', () => {
        let title;
        let scriptTag;
        test('it has a title', () => {
            title = document.querySelector('head title')
            expect(title).toBeTruthy();
        })

        test('the title is MyRandomStory', () => {
            title = document.querySelector('head title');
            expect(title.textContent).toBe('MyRandomStory');
        })

        test('there is a script tag', () => {
            scriptTag = document.querySelector('head script');
            expect(scriptTag).toBeTruthy();
        });

        test('the script tag is linked to the correct js file', () => {
            scriptTag = document.querySelector('head script');
            expect(scriptTag.src).toContain('script.js');
        })
        
    })


    describe('navbar', () => {
        describe('navbar links', () => {
            let navbarLinks;
            let navUl;

            beforeEach(() => {
                navbarLinks = document.querySelector('#navbar-links')
                navUl = document.querySelector('ul')
            })

            test('it exists', () => {
                expect(navbarLinks).toBeTruthy();
            })

            test('it has an id of navbar-links', () => {
                expect(navbarLinks.id).toBe('navbar-links')
            })

            test('the navbar list exists', ()=> {
                expect(navUl).toBeTruthy();
            })

            test('the navbar has 3 elements/links', () => {
                expect(navUl.children.length).toEqual(3);
            })

        })
    })

    describe('body', () => {
        
        describe('header', () => {
            let header;
            let heading;
            let tagline;

            beforeEach(() => {
                header = document.querySelector('header');
                heading = document.querySelector('header h1');
                tagline = document.querySelector('header h3')
            })

            it('exists', () => {
                expect(header).toBeTruthy();
            })

            it('has a main title for the page and has the right title', () => {
                expect(heading).toBeTruthy();
                expect(heading.textContent).toEqual('My Random Story');
            });

            test('tagline exists', () => {
                expect(tagline).toBeTruthy();
            });

            test('tagline has the correct message', () => {
                expect(tagline.textContent).toEqual("Post your stories on the internet so you don't bore your friends and therapist.")
            })
        })

        describe('form', () => {
            let form;
            let formTitle;
            let storyTitleInput;


            beforeEach(()=> {
                form = document.getElementById('outer-form');
                formTitle = document.getElementById('form-title')
                storyTitleInput = document.getElementById('story-title')
            })

            test('the story input form exists', () => {
                expect(form).toBeTruthy();
            })

            test('it has a title letting people know what the form is for', () => {
                expect(formTitle.textContent).toEqual('Add your story!')
            })

            test('it has a textbox for someone to submit the title of their story', () => {
                expect(storyTitleInput.tagName).toEqual('INPUT')
                expect(storyTitleInput.type).toEqual('text')
            })
        })
    })
});
