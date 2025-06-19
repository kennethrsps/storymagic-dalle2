// Replace your existing fetch call with this enhanced version
async function generateStoryWithImage() {
    const name = document.getElementById('childName').value || 'Emma';
    const age = document.getElementById('childAge').value;
    const theme = document.getElementById('storyTheme').value;
    
    // Show loading state
    const btn = document.getElementById('generateBtn');
    const spinner = document.getElementById('loadingSpinner');
    const btnText = document.getElementById('btnText');
    
    btn.disabled = true;
    spinner.style.display = 'block';
    btnText.textContent = 'Generating AI Image...';

    // Hide messages
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';

    try {
        const story = storyTemplates[theme];
        const prompt = story.prompt.replace(/{name}/g, name).replace(/{age}/g, age);
        
        console.log('Sending prompt:', prompt); // Debug log
        
        // Call your real DALL-E API
        const response = await fetch('/api/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: prompt })
        });

        console.log('Response status:', response.status); // Debug log
        console.log('Response headers:', response.headers); // Debug log
        
        // Get the response text first
        const responseText = await response.text();
        console.log('Raw response:', responseText); // Debug log

        if (!response.ok) {
            // Try to parse as JSON, fallback to raw text
            let errorMessage;
            try {
                const errorData = JSON.parse(responseText);
                errorMessage = errorData.error || `HTTP ${response.status}`;
            } catch (e) {
                errorMessage = `Server returned: ${responseText.substring(0, 200)}...`;
            }
            throw new Error(errorMessage);
        }

        // Parse the successful response
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}...`);
        }

        if (!data.data || !data.data[0] || !data.data[0].url) {
            throw new Error('No image URL in response');
        }

        const imageUrl = data.data[0].url;

        // Update story display with AI image as background
        const storyPage = document.getElementById('storyPage');
        const storyTitle = document.getElementById('storyTitle');
        const storyText = document.getElementById('storyText');
        
        storyPage.style.backgroundImage = `url(${imageUrl})`;
        storyTitle.textContent = story.title.replace(/{name}/g, name);
        storyText.innerHTML = story.text.replace(/{name}/g, name);

        // Show the story book
        document.getElementById('defaultPreview').style.display = 'none';
        document.getElementById('storyBook').style.display = 'block';

        // Update character preview
        document.getElementById('characterPreview').innerHTML = getThemeEmoji(theme);

        // Show success message
        showSuccess('🎉 AI story generated successfully with real DALL-E!');

    } catch (error) {
        console.error('Full error:', error); // Debug log
        showError(`Failed to generate story: ${error.message}`);
    } finally {
        // Reset button state
        btn.disabled = false;
        spinner.style.display = 'none';
        btnText.textContent = '🎨 Generate Story with Real DALL-E!';
    }
}
