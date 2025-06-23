import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DownloadIcon from '@mui/icons-material/Download';
import SaveIcon from '@mui/icons-material/Save';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [keywords, setKeywords] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const generateContent = async () => {
    if (!keywords.trim()) {
      setError('Please enter some keywords');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Call OpenAI directly from frontend (for MVP simplicity)
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{
            role: 'user',
            content: `Generate marketing content for these keywords: "${keywords}"

Please provide JSON response with:
1. SEO title (max 60 chars)
2. Meta description (max 160 chars)  
3. 3 Google Ads headlines (max 30 chars each)
4. 2 Google Ads descriptions (max 90 chars each)

Format:
{
  "seoTitle": "your title",
  "metaDescription": "your description", 
  "adHeadlines": ["headline1", "headline2", "headline3"],
  "adDescriptions": ["desc1", "desc2"]
}`
          }],
          temperature: 0.7,
          max_tokens: 500
        }),
      });

      if (!response.ok) {
        throw new Error('OpenAI API request failed');
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      try {
        const parsedContent = JSON.parse(content);
        setGeneratedContent({
          keywords,
          seo: {
            title: parsedContent.seoTitle,
            metaDescription: parsedContent.metaDescription
          },
          ads: {
            headlines: parsedContent.adHeadlines,
            descriptions: parsedContent.adDescriptions
          }
        });
        setSuccess('Content generated successfully!');
      } catch (parseError) {
        // Fallback if JSON parsing fails
        setGeneratedContent({
          keywords,
          seo: {
            title: `${keywords} - Premium Quality & Best Prices`,
            metaDescription: `Discover the best ${keywords} with unbeatable quality and competitive prices. Shop now for premium solutions.`
          },
          ads: {
            headlines: [
              `Best ${keywords} Available`,
              `Premium ${keywords} Now`, 
              `${keywords} - Top Quality`
            ],
            descriptions: [
              `Get the finest ${keywords} with fast delivery and great prices.`,
              `Shop premium ${keywords} today. Quality guaranteed with fast shipping!`
            ]
          }
        });
        setSuccess('Content generated successfully! (Used fallback generation)');
      }

    } catch (error) {
      console.error('Generation error:', error);
      setError('Failed to generate content. Please check your OpenAI API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveToStoryblok = async () => {
    if (!generatedContent) return;

    setLoading(true);
    setError('');

    try {
      // Create content in Storyblok
      const storyblokResponse = await axios.post(
        `https://mapi.storyblok.com/v1/spaces/${import.meta.env.VITE_STORYBLOK_SPACE_ID}/stories/`,
        {
          story: {
            name: `AI Generated Content - ${generatedContent.keywords}`,
            slug: `ai-${Date.now()}`,
            content: {
              component: 'page',
              seo_title: generatedContent.seo.title,
              seo_description: generatedContent.seo.metaDescription,
              keywords: generatedContent.keywords,
              ad_headlines: generatedContent.ads.headlines,
              ad_descriptions: generatedContent.ads.descriptions
            }
          }
        },
        {
          headers: {
            'Authorization': import.meta.env.VITE_STORYBLOK_TOKEN,
            'Content-Type': 'application/json'
          }
        }
      );

      setSuccess('Content saved to Storyblok successfully!');
    } catch (error) {
      console.error('Storyblok save error:', error);
      setError('Failed to save to Storyblok. Please check your API token.');
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (!generatedContent) return;

    const headers = [
      'Campaign',
      'Ad Group', 
      'Keyword',
      'Headline 1',
      'Headline 2', 
      'Headline 3',
      'Description 1',
      'Description 2',
      'Final URL'
    ];

    let csv = headers.join(',') + '\n';

    const row = [
      `${generatedContent.seo.title} Campaign`,
      `${generatedContent.keywords} Ad Group`,
      generatedContent.keywords,
      generatedContent.ads.headlines[0] || '',
      generatedContent.ads.headlines[1] || '',
      generatedContent.ads.headlines[2] || '',
      generatedContent.ads.descriptions[0] || '',
      generatedContent.ads.descriptions[1] || '',
      'https://example.com'
    ];

    csv += row.map(field => `"${field}"`).join(',') + '\n';

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `google-ads-${generatedContent.keywords.replace(/\s+/g, '-')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setSuccess('Google Ads CSV downloaded successfully!');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <AutoAwesomeIcon sx={{ mr: 1, color: 'primary.main', fontSize: 32 }} />
            <Typography variant="h4" component="h1">
              AI Content Generator for Storyblok
            </Typography>
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Generate SEO-optimized content and Google Ads campaigns using AI, then save directly to Storyblok
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: 'fit-content' }}>
                <Typography variant="h6" gutterBottom>
                  1. Enter Keywords
                </Typography>
                <TextField
                  fullWidth
                  label="Target keywords"
                  placeholder="e.g., organic coffee, sustainable beans"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  multiline
                  rows={3}
                  sx={{ mb: 2 }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={generateContent}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <AutoAwesomeIcon />}
                  sx={{ mb: 2 }}
                >
                  {loading ? 'Generating...' : 'Generate Content'}
                </Button>

                {generatedContent && (
                  <>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="large"
                      onClick={saveToStoryblok}
                      disabled={loading}
                      startIcon={<SaveIcon />}
                      sx={{ mb: 1 }}
                    >
                      Save to Storyblok
                    </Button>

                    <Button
                      fullWidth
                      variant="outlined"
                      size="large"
                      onClick={exportToCSV}
                      startIcon={<DownloadIcon />}
                    >
                      Export CSV
                    </Button>
                  </>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  {success}
                </Alert>
              )}

              {generatedContent && (
                <Paper sx={{ p: 0 }}>
                  <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
                    <Tab label="SEO Content" />
                    <Tab label="Google Ads" />
                    <Tab label="CSV Preview" />
                  </Tabs>

                  <TabPanel value={tabValue} index={0}>
                    <Card>
                      <CardContent>
                        <Box sx={{ mb: 2 }}>
                          <Chip label={generatedContent.keywords} color="primary" />
                        </Box>
                        
                        <Typography variant="h6" color="primary" gutterBottom>
                          SEO Title ({generatedContent.seo.title.length}/60 chars)
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, fontFamily: 'monospace', bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
                          {generatedContent.seo.title}
                        </Typography>

                        <Typography variant="h6" color="primary" gutterBottom>
                          Meta Description ({generatedContent.seo.metaDescription.length}/160 chars)
                        </Typography>
                        <Typography variant="body1" sx={{ fontFamily: 'monospace', bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
                          {generatedContent.seo.metaDescription}
                        </Typography>
                      </CardContent>
                    </Card>
                  </TabPanel>

                  <TabPanel value={tabValue} index={1}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" color="primary" gutterBottom>
                          Ad Headlines
                        </Typography>
                        {generatedContent.ads.headlines.map((headline, index) => (
                          <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              Headline {index + 1} ({headline.length}/30 chars)
                            </Typography>
                            <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                              {headline}
                            </Typography>
                          </Box>
                        ))}

                        <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 3 }}>
                          Ad Descriptions
                        </Typography>
                        {generatedContent.ads.descriptions.map((desc, index) => (
                          <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              Description {index + 1} ({desc.length}/90 chars)
                            </Typography>
                            <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                              {desc}
                            </Typography>
                          </Box>
                        ))}
                      </CardContent>
                    </Card>
                  </TabPanel>

                  <TabPanel value={tabValue} index={2}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Google Ads CSV Preview
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          This data will be exported in Google Ads bulk upload format
                        </Typography>
                        <Box sx={{ overflow: 'auto' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'monospace', fontSize: '12px' }}>
                            <thead>
                              <tr style={{ backgroundColor: '#f5f5f5' }}>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Campaign</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Ad Group</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Keyword</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Headline 1</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Headline 2</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description 1</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{generatedContent.seo.title} Campaign</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{generatedContent.keywords} Ad Group</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{generatedContent.keywords}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{generatedContent.ads.headlines[0]}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{generatedContent.ads.headlines[1]}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{generatedContent.ads.descriptions[0]}</td>
                              </tr>
                            </tbody>
                          </table>
                        </Box>
                      </CardContent>
                    </Card>
                  </TabPanel>
                </Paper>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;