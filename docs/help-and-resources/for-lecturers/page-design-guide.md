# Page design guide

This is a basic overview of which features you can use to design a MkDocs page. You can find more information at [https://squidfunk.github.io/mkdocs-material/reference/](https://squidfunk.github.io/mkdocs-material/reference/).

``` title="Normal paragraph"
You write normal paragraph text just by typing like this. 
```
<div class="result" markdown>
<span style="color: #a1a1a1; float: right;">Preview</span>
<br>
You write normal paragraph text just by typing like this. 
</div>

``` title="Headings"
You can create headings by placing a # before the text like so:. 
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
```
<div class="result" markdown style="padding-bottom: 20px; padding-top: 20px;">
<span style="color: #a1a1a1; float: right;">Preview</span>
<br>
<h1 style="margin: 0 !important">Heading 1</h1>
<h2 style="margin: 0 !important">Heading 2</h2>
<h3 style="margin: 0 !important">Heading 3</h3>
<h4 style="margin: 0 !important">Heading 4</h4>
</div>

``` title="Inserting links"
You can insert links by:

I want to insert a link [here](https://www.researcher.aau.dk/contact/claaudia)
```
<div class="result" markdown>
<span style="color: #a1a1a1; float: right;">Preview</span>
<br>
I want to insert a link [here](https://www.researcher.aau.dk/contact/claaudia)
</div>


``` title="Code in paragrapgh"

You use backticks to `write code in text`.

```
<div class="result" markdown>
<span style="color: #a1a1a1; float: right;">Preview</span>
<br>
You use backticks to `write code in text`.
</div>

``` title="Console codeblocks"

 You can also create a console codeblock like so:

 ```console
 ssh -l xxxxxx@student.aau.dk ai-fe02.srv.aau.dk
 ```
```
<div class="result" markdown>
<span style="color: #a1a1a1; float: right;">Preview</span>
<br>
```console
ssh -l xxxxxx@student.aau.dk ai-fe02.srv.aau.dk
```
</div>

``` title="Python codeblocks"

 You can also create a Python codeblock like so:

 ```py
 import tensorflow as tf
 for i in range(len(100)):
    print(i)
 ```
```
<div class="result" markdown>
<span style="color: #a1a1a1; float: right;">Preview</span>
<br>
```py
import tensorflow as tf

for i in range(len(100)):
    print(i)
```
</div>

``` title="Call-outs"
You can make call-outs/admonitions like so:

!!! info "This is the title"
    This is the content

```

<div class="result" markdown>
<span style="color: #a1a1a1; float: right;">Preview</span>
!!! info "This is the title"
    This is the content

</div>


``` title="Data tables"
You can also create data tables like this:

| Method      | Description     |
| ----------- | --------------- |
| `GET`       | Fetch resource  |
| `PUT`       | Update resource |
| `DELETE`    | Delete resource |
```

<div class="result" markdown>
<span style="color: #a1a1a1; float: right;">Preview</span>
<br>

| Method      | Description     |
| ----------- | --------------- |
| `GET`       | Fetch resource  |
| `PUT`       | Update resource |
| `DELETE`    | Delete resource |

</div>

``` title="Custom HTML/CSS"
<div>
    <p>
        You can paste your own custom HTML/CSS as you would in a normal .html file
    </p>
</div>
``` 

<div class="result" markdown>
<span style="color: #a1a1a1; float: right;">Preview</span>
<br>
<div>
    <p>
        You can paste your own custom HTML/CSS as you would in a normal .html file
    </p>
</div>
</div>

``` title="Inserting images"

You can insert images from urls or by uploading images to "/assets/img/":

![Image of CLAAUDIA Logo](../../assets/img/claaudia-logo.pngg)

```
<div class="result" markdown>
<span style="color: #a1a1a1; float: right;">Preview</span>
<br>
![Image of CLAAUDIA Logo](../../assets/img/claaudia-logo.png)
</div>