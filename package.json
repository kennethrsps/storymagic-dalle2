import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>StoryMagic - Real DALL-E Integration</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <style jsx global>{`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Comic Sans MS', cursive, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(45deg, #ff6b6b, #ffa726);
            color: white;
            text-align: center;
            padding: 30px;
        }

        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .main-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0;
            min-height: 600px;
        }

        .form-section {
            padding: 40px;
            background: #f8f9fa;
        }

        .preview-section {
            padding: 40px;
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .form-group {
            margin-bottom: 25px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: #333;
            font-size: 1.1em;
        }

        .form-group input, .form-group select {
            width: 100%;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 10px;
            font-size: 1em;
            font-family: inherit;
            transition: border-color 0.3s;
        }

        .form-group input:focus, .form-group select:focus {
            outline: none;
            border-color: #ff6b6b;
        }

        .generate-btn {
            background: linear-gradient(45deg, #4ecdc4, #44a08d);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 1.2em;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.3s, box-shadow 0.3s;
            width: 100%;
            position: relative;
            overflow: hidden;
        }

        .generate-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .generate-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
        }

        .debug-btn {
            background: linear-gradient(45deg, #ff4757, #ff3838);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 15px;
            font-size: 0.9em;
            font-weight: bold;
            cursor: pointer;
            width: 100%;
            margin-top: 10px;
        }

        .loading-spinner {
            display: none;
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            border: 2px solid transparent;
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: translateY(-50%) rotate(0deg); }
            100% { transform: translateY(-50%) rotate(360deg); }
        }

        .story-book {
            display: none;
            width: 100%;
            height: 500px;
            border-radius: 15px;
            overflow: hidden;
            position: relative;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .story-page {
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .story-overlay {
            background: rgba(0,0,0,0.4);
            color: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 80%;
            text-align: center;
            backdrop-filter: blur(5px);
            border: 2px solid rgba(255,255,255,0.3);
        }

        .story-title {
            font-size: 2em;
            margin-bottom: 15px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
        }

        .story-text {
            font-size: 1.1em;
            line-height: 1.6;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
        }

        .highlight {
            background: linear-gradient(120deg, #a8edea 0%, #fed6e3 100%);
            padding: 3px 8px;
            border-radius: 6px;
            font-weight: bold;
            color: #333;
        }

        .character-preview {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin: 0 auto 20px;
            background: linear-gradient(45deg, #ff9a9e, #fecfef);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4em;
            border: 5px solid white;
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        }

        .error-message {
            background: #ffebee;
            color: #c62828;
            padding: 15px;
            border-radius: 10px;
            margin-top: 15px;
            border-left: 5px solid #f44336;
            display: none;
        }

        .success-message {
            background: #e8f5e8;
            color: #2e7d32;
            padding: 15px;
            border-radius: 10px;
            margin-top: 15px;
            border-left: 5px solid #4caf50;
            display: none;
        }

        .cost-info {
            background: #e8f5e8;
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
            border-left: 5px solid #4caf50;
            font-size: 0.9em;
        }

        @media (max-width: 768px) {
            .main-content {
                grid-template-columns: 1fr;
            }
            
            .story-overlay {
                padding: 20px;
                max-width: 90%;
            }
            
            .story-title {
                font-size: 1.5em;
            }
        }
      `}</style>

      <div className="container">
        <div className="header">
          <h1>🎨 StoryMagic with Real DALL-E</h1>
          <p>Create personalized children's books with AI-generated illustrations!</p>
        </div>

        <div className="main-content">
          <div className="form-section">
            <h2 style={{color: '#333', marginBottom: '30px', textAlign: 'center'}}>Create Your Story</h2>
            
            <div className="form-group">
              <label htmlFor="childName">Child's Name</label>
              <input type="text" id="childName" placeholder="Enter your child's name" defaultValue="Emma" />
            </div>

            <div className="form-group">
              <label htmlFor="childAge">Age</label>
              <select id="childAge" defaultValue="6">
                <option value="4">4 years old</option>
                <option value="5">5 years old</option>
                <option value="6">6 years old</option>
                <option value="7">7 years old</option>
                <option value="8">8 years old</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="storyTheme">Story Theme</label>
              <select id="storyTheme" defaultValue="garden">
                <option value="garden">🌻 Magical Garden</option>
                <option value="space">🚀 Space Adventure</option>
                <option value="princess">👑 Royal Adventure</option>
                <option value="ocean">🌊 Ocean Explorer</option>
                <option value="forest">🌲 Enchanted Forest</option>
              </select>
            </div>

            <button className="generate-btn" onClick={() => generateStoryWithImage()} id="generateBtn">
              <div className="loading-spinner" id="loadingSpinner"></div>
              <span id="btnText">🎨 Generate Story with Real DALL-E!</span>
            </button>

            <button className="debug-btn" onClick={() => debugApiCall()}>🔍 DEBUG API (Check Console)</button>

            <div className="cost-info">
              <h4 style={{color: '#2e7d32', marginBottom: '8px'}}>💰 Real DALL-E Cost</h4>
              <p>• Each image: ~$0.04</p>
              <p>• Uses your OpenAI credits</p>
              <p>• High-quality 1024x1024 images</p>
            </div>

            <div className="error-message" id="errorMessage"></div>
            <div className="success-message" id="successMessage"></div>
          </div>

          <div className="preview-section">
            <div className="character-preview" id="characterPreview">
              🌻
            </div>

            <div className="story-book" id="storyBook">
              <div className="story-page" id="storyPage">
                <div className="story-overlay">
                  <div className="story-title" id="storyTitle">Your Story Title</div>
                  <div className="story-text" id="storyText">Your personalized story will appear here...</div>
                </div>
              </div>
            </div>

            <div id="defaultPreview" style={{textAlign: 'center'}}>
              <h3 style={{color: '#333', marginBottom: '15px'}}>AI Story Preview</h3>
              <p style={{color: '#666'}}>Generate your story to see the AI image as background with your personalized text overlay!</p>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          // Story templates
          const storyTemplates = {
            garden: {
              title: "{name}'s Magical Garden Adventure",
              text: "Once upon a time, <span class='highlight'>{name}</span> discovered a magical garden where flowers could talk and butterflies granted wishes. With courage and kindness, {name} helped save the garden from a terrible drought, learning that caring for others brings the greatest magic of all.",
              prompt: "A beautiful magical garden with talking flowers, colorful butterflies, and a happy {age}-year-old child named {name} watering glowing plants, fantasy children's book illustration, vibrant colors, whimsical and enchanting"
            },
            space: {
              title: "Commander {name}'s Space Mission",
              text: "Brave astronaut <span class='highlight'>{name}</span> received an urgent mission to save a distant planet. Flying through sparkling nebulas and past dancing comets, {name} discovered that friendship and teamwork were the greatest powers in the universe.",
              prompt: "A young {age}-year-old astronaut named {name} in a colorful space suit floating among stars, planets, and nebulas, surrounded by friendly alien creatures, children's book illustration, cosmic and magical"
            },
            princess: {
              title: "Princess {name} and the Crystal Kingdom",
              text: "In a kingdom made of shimmering crystals, Princess <span class='highlight'>{name}</span> embarked on a quest to restore the kingdom's lost colors. Through acts of kindness and wisdom beyond their years, {name} learned that true royalty comes from helping others.",
              prompt: "A young {age}-year-old royal child named {name} in a beautiful crystal palace with rainbow reflections, wearing a crown and royal clothes, surrounded by magical crystal formations, children's book illustration, sparkly and majestic"
            },
            ocean: {
              title: "{name}'s Underwater Adventure",
              text: "Deep beneath the ocean waves, <span class='highlight'>{name}</span> discovered an underwater city filled with friendly sea creatures. Together with dolphins, seahorses, and wise old turtles, {name} helped protect the ocean's greatest treasure - its beautiful coral gardens.",
              prompt: "A cheerful {age}-year-old child named {name} swimming underwater with colorful fish, dolphins, and sea turtles in a vibrant coral reef, magical underwater scene, children's book illustration, bright and oceanic"
            },
            forest: {
              title: "{name} and the Enchanted Forest",
              text: "When <span class='highlight'>{name}</span> wandered into an enchanted forest, they met talking animals who needed help finding their lost home. With bravery and a kind heart, {name} led them through magical adventures to safety.",
              prompt: "A brave {age}-year-old child named {name} in an enchanted forest with talking animals like rabbits, deer, and owls, magical trees with glowing leaves, children's book illustration, warm and mystical"
            }
          };

          async function debugApiCall() {
            console.log('=== DEBUGGING API CALL ===');
            
            try {
              console.log('1. Testing API endpoint...');
              
              const response = await fetch('/api/generate-image', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                  prompt: "A test image of a happy child in a garden" 
                })
              });

              console.log('2. Response status:', response.status);
              console.log('3. Response ok:', response.ok);
              console.log('4. Response headers:', Object.fromEntries(response.headers.entries()));
              
              const responseText = await response.text();
              console.log('5. Raw response text (first 500 chars):', responseText.substring(0, 500));
              
              if (responseText.startsWith('{')) {
                console.log('6. ✅ Response is JSON');
                const data = JSON.parse(responseText);
                console.log('7. Parsed JSON:', data);
              } else {
                console.log('6. ❌ Response is NOT JSON - likely an error page');
                console.log('7. Full response:', responseText);
              }
              
              alert('Debug complete! Check the browser console for details.');
              
            } catch (error) {
              console.error('DEBUG ERROR:', error);
              alert('Debug failed! Check console for error details.');
            }
          }

          async function generateStoryWithImage() {
            const name = document.getElementById('childName').value || 'Emma';
            const age = document.getElementById('childAge').value;
            const theme = document.getElementById('storyTheme').value;
            
            const btn = document.getElementById('generateBtn');
            const spinner = document.getElementById('loadingSpinner');
            const btnText = document.getElementById('btnText');
            
            btn.disabled = true;
            spinner.style.display = 'block';
            btnText.textContent = 'Generating AI Image...';

            document.getElementById('errorMessage').style.display = 'none';
            document.getElementById('successMessage').style.display = 'none';

            try {
              const story = storyTemplates[theme];
              const prompt = story.prompt.replace(/{name}/g, name).replace(/{age}/g, age);
              
              console.log('Sending prompt:', prompt);
              
              const response = await fetch('/api/generate-image', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: prompt })
              });

              console.log('Response status:', response.status);
              
              const responseText = await response.text();
              console.log('Raw response (first 200 chars):', responseText.substring(0, 200));

              if (!response.ok) {
                let errorMessage;
                try {
                  const errorData = JSON.parse(responseText);
                  errorMessage = errorData.error || \`HTTP \${response.status}\`;
                } catch (e) {
                  errorMessage = \`Server returned: \${responseText.substring(0, 200)}...\`;
                }
                throw new Error(errorMessage);
              }

              let data;
              try {
                data = JSON.parse(responseText);
              } catch (e) {
                throw new Error(\`Invalid JSON response: \${responseText.substring(0, 100)}...\`);
              }

              if (!data.data || !data.data[0] || !data.data[0].url) {
                throw new Error('No image URL in response');
              }

              const imageUrl = data.data[0].url;

              const storyPage = document.getElementById('storyPage');
              const storyTitle = document.getElementById('storyTitle');
              const storyText = document.getElementById('storyText');
              
              storyPage.style.backgroundImage = \`url(\${imageUrl})\`;
              storyTitle.textContent = story.title.replace(/{name}/g, name);
              storyText.innerHTML = story.text.replace(/{name}/g, name);

              document.getElementById('defaultPreview').style.display = 'none';
              document.getElementById('storyBook').style.display = 'block';

              document.getElementById('characterPreview').innerHTML = getThemeEmoji(theme);

              showSuccess('🎉 AI story generated successfully with real DALL-E!');

            } catch (error) {
              console.error('Full error:', error);
              showError(\`Failed to generate story: \${error.message}\`);
            } finally {
              btn.disabled = false;
              spinner.style.display = 'none';
              btnText.textContent = '🎨 Generate Story with Real DALL-E!';
            }
          }

          function getThemeEmoji(theme) {
            const emojis = {
              garden: '🌻',
              space: '🚀',
              princess: '👑',
              ocean: '🌊',
              forest: '🌲'
            };
            return emojis[theme] || '✨';
          }

          function showError(message) {
            const errorEl = document.getElementById('errorMessage');
            errorEl.textContent = message;
            errorEl.style.display = 'block';
            setTimeout(() => {
              errorEl.style.display = 'none';
            }, 5000);
          }

          function showSuccess(message) {
            const successEl = document.getElementById('successMessage');
            successEl.textContent = message;
            successEl.style.display = 'block';
            setTimeout(() => {
              successEl.style.display = 'none';
            }, 3000);
          }

          document.getElementById('storyTheme').addEventListener('change', function() {
            document.getElementById('characterPreview').textContent = getThemeEmoji(this.value);
          });
        `
      }} />
    </>
  );
}`
