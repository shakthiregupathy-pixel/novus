import streamlit as st
from querryproccessor import process_user_query

# Set up the page configuration
st.set_page_config(page_title="HR Assistant Bot", page_icon="🤖")
st.title("Employee Assistant Chatbot")

# Initialize chat history in Streamlit session state
if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "assistant", "content": "Hello! Ask me about employee details, policies, or performance."}
    ]

# Display chat messages from history on app rerun
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# React to user input
if prompt := st.chat_input("What would you like to know?"):
    # Display user message in chat message container
    st.chat_message("user").markdown(prompt)
    
    # Add user message to chat history
    st.session_state.messages.append({"role": "user", "content": prompt})

    # Display assistant response with a loading spinner
    with st.chat_message("assistant"):
        with st.spinner("Searching database..."):
            try:
                # Call your backend logic!
                response = process_user_query(prompt)
                
                # Display the response
                st.markdown(response)
                
                # Add assistant response to chat history
                st.session_state.messages.append({"role": "assistant", "content": response})
            except Exception as e:
                st.error(f"An error occurred: {e}")