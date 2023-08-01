# Find-Semanticaly-Similar-Words
This repository helps find words that have similar meanings. It also gives a similarity value calculated from Word2vec.

This repository is for finding the semantically similar words. It gives a word and value lists that are most semantically similar to a given word.
It uses Word2vec to generate numerical representations of words, which then can be used to estimate similarity value between the words.

How to use:
You can input a word and get a list of other words and values that are most similar to it.
You can adjust various parameters to control the similarity threshold and the number of similar words returned.

Please find the demo at https://simgeekiz.github.io/Find-Semanticaly-Similar-Words/


## Installation for Python development

1. Clone the repository
    ```shell
    $ python3 -m venv .env
    ```
2. Create a virtual environment and then activate it
    ```shell
    $ python3 -m venv .env
    $ source .env/bin/activate
    ```

3. Install requirements.txt (I do not want to create requirements.txt)
    ```shell
    $ pip install jupyter
    $ pip install gensim
    ```



# References

- https://radimrehurek.com/gensim/auto_examples/tutorials/run_word2vec.html